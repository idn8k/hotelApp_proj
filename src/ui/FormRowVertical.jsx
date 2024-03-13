import styled from 'styled-components';

const StyledFormRowVertical = styled.div`
   display: grid;
   /* display: inline-flex; */
   align-items: center;
   /* grid-template-columns: 24rem 1fr; */
   gap: 2rem;

   padding: 1.2rem 0;

   &:first-child {
      padding-top: 0;
   }

   &:last-child {
      padding-bottom: 0;
   }

   &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
   }

   /* &:has(button) {
      display: flex;
      justify-content: center;
      gap: 1.2rem;
   } */
`;

const Label = styled.label`
   font-weight: 500;
`;

const Error = styled.span`
   font-size: 1.4rem;
   color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
   return (
      <StyledFormRowVertical>
         {label && <Label htmlFor={children.props.id}>{label}</Label>}
         {children}
         {error && <Error>{error}</Error>}
      </StyledFormRowVertical>
   );
}

export default FormRowVertical;
