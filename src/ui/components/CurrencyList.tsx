import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  BackHandler,
} from 'react-native';
import EmptyView from './EmptyView';
import SearchBar from './SearchBar';
import { CurrencyInfo } from '../../features/currencies/types';
import { matchesSearch } from '../../features/currencies/match';

export default function CurrencyList({
  data,
  title,
}: Readonly<{
  data: CurrencyInfo[];
  title: string;
}>) {
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (searching) {
        setSearching(false);
        setQ('');
        return true; // handled
      }
      return false; // let OS handle
    });
    return () => sub.remove();
  }, [searching]);

  const filtered = useMemo(
    () => data.filter(d => matchesSearch(q, d)),
    [q, data],
  );

  const renderItem = ({ item }: { item: CurrencyInfo }) => (
    <View style={styles.itemRow}>
      {/* Avatar with initial */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>

      {/* Name */}
      <Text style={styles.name}>{item.name}</Text>

      {/* Right section: Symbol + Chevron */}
      <View style={styles.rightSection}>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!searching ? (
        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={() => setSearching(true)}>
            <Text style={styles.searchBtn}>Search</Text>
          </Pressable>
        </View>
      ) : (
        <SearchBar
          value={q}
          onChange={setQ}
          onBack={() => {
            setSearching(false);
            setQ('');
          }}
          onClear={() => setQ('')}
        />
      )}

      {filtered.length === 0 ? (
        <EmptyView message={q ? 'No Results \nTry "BTC"' : 'No Data'} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={it => it.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: { fontSize: 18, fontWeight: '600' },
  searchBtn: { fontSize: 16 },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: '#ddd' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  name: {
    flex: 1, // pushes right section to the edge
    fontSize: 16,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbol: {
    fontWeight: 'bold',
    marginRight: 6,
    fontSize: 14,
    color: '#555',
  },
  chevron: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#888',
  },
});
