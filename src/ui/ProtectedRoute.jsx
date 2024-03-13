import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
   height: 100vh;
   background-color: var(--color-gray-50);
   display: flex;
   align-items: center;
   justify-content: center;
`;

function ProtectedRoute({ children }) {
   //-- navigate can be used inside of another function and not at the top level!
   const navigate = useNavigate();

   // 1. Load the auth user
   const { isLoading, isAuthenticated } = useUser();

   // 2. If NO auth user, redirect to /login
   //-- Therefore, we use it inside of a useEffect hook
   useEffect(
      function () {
         if (!isAuthenticated && !isLoading) navigate('/login');
      },
      [isAuthenticated, isLoading, navigate]
   );

   // 3.While loading, show spinner
   if (isLoading)
      return (
         <FullPage>
            <Spinner />
         </FullPage>
      );

   // 4. If there's user, render app
   if (isAuthenticated) return children;
}

export default ProtectedRoute;
