import { PageRoute, AdminRoute, SingleView } from 'View';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from 'Context/CartContext'
import { ItemsProvider } from 'Context/ItemsContext'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ItemsProvider>
          <div className="App w-auto">
            <Routes>
              <Route path='/*' element={<PageRoute />} />
              <Route path='/admin/*' element={<AdminRoute />} />
              <Route path='/confirmation/*' element={<SingleView />} />
            </Routes>
          </div>
        </ItemsProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
