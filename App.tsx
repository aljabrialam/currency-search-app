import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
// import { AppDispatch, store } from './src/app/store';
import AppNavigator from './src/AppNavigator';

import { initDb } from './src/db/db';
import { store } from './src/app/store';
// import { insertSeedsThunk } from './src/features/currencies/currenciesSlice';


export default function App() {

  useEffect(() => {
    // const dispatch = useDispatch<AppDispatch>();
    const seedDatabase = async () => {
      try {
        await initDb();            // Ensure table exists
        // await insertMany(allCurrencies); // Insert all seed data
        // await dispatch(insertSeedsThunk());
        console.log('Database seeded successfully!');
      } catch (err) {
        console.error('Database seeding failed:', err);
      }
    };

    seedDatabase();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
