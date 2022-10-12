import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersistLogin from "./components/persist-login";
import IsNotAuth from "./components/is-not-auth";
import RequireAuth from "./components/require-auth";
import Navbar from "./components/nav-bar";
import Home from "./pages/home";
import Landing from "./pages/landing-page";
import Login from "./pages/login-page";
import Register from "./pages/register";
import Private from "./pages/private";
import ForgotPassword from "./pages/forgot-password";
import AccountVerification from "./pages/account-verification";
import Chat from "./pages/chat";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route element={<PersistLogin />}>
          <Route element={<IsNotAuth />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/accountVerification" element={<AccountVerification />} />
          </Route>
          <Route path="/chat" element={<Chat />} />
          {/* Private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/private" element={<Private />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

//************************************************************/

// import { useAppSelector, useAppDispatch } from "./app/hooks";
// import { incremented, decrement, incrementByAmount } from "./features/counter/counter-slice";
// import { useFetchBreedsQuery } from "./features/dogs/dog-slice";

// function App() {
//   const count = useAppSelector((state) => state.counter.value);
//   const dispatch = useAppDispatch();

//   const { data = [], isFetching } = useFetchBreedsQuery();

//   return (
//     <div>
//       <h1>Counter is: {count}</h1>
//       <button onClick={() => dispatch(incremented())}>Increment</button>
//       <br />
//       <button onClick={() => dispatch(decrement())}>Decrement</button>
//       <br />
//       <button onClick={() => dispatch(incrementByAmount(5))}>Increment By Value</button>
//       <br />
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Picture</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((breed) => (
//             <tr key={breed.id}>
//               <td>{breed.name}</td>
//               <td>
//                 <img src={breed.image.url} alt={breed.name} height={250} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;
