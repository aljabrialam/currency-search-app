import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import {
  clearDbThunk,
  insertSeedsThunk,
  loadAThunk,
  loadBThunk,
  loadPurchasablesThunk,
} from '../../features/currencies/currenciesSlice';
import CurrencyList from '../components/CurrencyList';
import { ToastAndroid } from 'react-native';
import { Btn } from '../components/Btn';

export default function DemoScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, mode } = useSelector((s: RootState) => s.currencies);

  // Load Crypto (A) on first launch (after you press "Insert Data" at least once)
  useEffect(() => {
    // no-op on start; user chooses actions via buttons
  }, []);

  const title =
    mode === 'A_CRYPTO'
      ? 'Currency List A - Crypto'
      : mode === 'B_FIAT'
      ? 'Currency List B - Fiat'
      : 'Purchasable (A + B)';

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator style={{ padding: 8 }} />}

      <CurrencyList data={items} title={title} />

      <View style={styles.buttonsRow}>
        <Btn
          label="1) Clear DB"
          onPress={() => {
            ToastAndroid.show('Clearing DB...', ToastAndroid.SHORT);
            dispatch(clearDbThunk());
          }}
        />
        <Btn
          label="2) Insert Data"
          onPress={async () => {
            ToastAndroid.show('Inserting seed data...', ToastAndroid.SHORT);

            // Wait for insert to finish
            await dispatch(insertSeedsThunk());

            // Then load data immediately
            ToastAndroid.show('Loading all data...', ToastAndroid.SHORT);
            await dispatch(loadAThunk());
            await dispatch(loadBThunk());
            await dispatch(loadPurchasablesThunk());
          }}
        />

        <Btn
          label="3) Show A (Crypto)"
          onPress={() => {
            ToastAndroid.show('Loading Crypto list...', ToastAndroid.SHORT);
            dispatch(loadAThunk());
          }}
        />
        <Btn
          label="4) Show B (Fiat)"
          onPress={() => {
            ToastAndroid.show('Loading Fiat list...', ToastAndroid.SHORT);
            dispatch(loadBThunk());
          }}
        />
        <Btn
          label="5) Show Purchasable"
          onPress={() => {
            ToastAndroid.show(
              'Loading Purchasable items...',
              ToastAndroid.SHORT,
            );
            dispatch(loadPurchasablesThunk());
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonsRow: { padding: 12, gap: 8, marginBottom: 80 }
});
