import styled from "styled-components";

export const QuestionContainer = styled.div<{
  isDragging: boolean;
  mandatory: boolean;
}>`
  padding: 1.5rem 0 1.25rem;
  border: 1px solid #dee4ed;
  border-radius: 0.75rem;

  box-shadow: ${(p) =>
    p.isDragging
      ? "0 0px 7px rgba(66,66,66,0.08), 0 8px 10px rgba(66,66,66,0.1)"
      : ""};
  background: ${(p) => (p.isDragging ? "#fafafa" : "#ffffff")};
`;

export const OuterContainer = styled.div`
  &::focus {
    outline: 0px;
  }
  user-select: none;
  padding: 0 0 0.5rem 0;
  margin: 0;
  border: 0;
`;

export const InnerContainer = styled.div`
  padding: 0 1rem;
`;

export const Label = styled.div`
  padding-bottom: 1rem;
  margin: 0 0.5rem;
  text-align: left;
  line-height: 1.5rem;
`;

export const ResponseContainer = styled.div`
  display: flex;
  user-select: none;
  flex-direction: column wrap;
  align-items: stretch;
  :first-child {
    margin: 0 0.5rem 0 0;
  }
`;

export const StyledButton = styled.button`
  background: #f3f6fb;
  margin: 0 0 0 0.5rem;
  flex: 1;

  padding: 0.75rem 1.25rem;
  background-color: #f9fbfe;
  border: 1px solid #dee4ed;
  border-radius: 0.5rem;
  color: #344563;
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  opacity: 1;
  outline: 0px;
  text-align: center;
  text-overflow: ellipsis;
  user-select: none;
  word-break: normal;

  &:active {
    background: #f3f6fb;
  }

  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  border: 1px solid #dee4ed;
  border-radius: 0.3rem;
  color: #344563;
  font-size: 0.875rem;
  font-weight: 400;
  outline: 0px;
  line-height: 1.5rem;

  &:focus {
    outline: none;
    border-color: #6559ff;
  }
`;

export const AttachmentBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 0 0;

  font-size: 12px;
`;

export const InlineButton = styled.button`
  margin: 0px;
  padding: 0.25rem;
  background-color: #f3f6fb;
  border: none;
  border-radius: 0.5rem;
  color: rgb(52, 69, 99);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.025rem;
  line-height: 1.25rem;
  cursor: pointer;
  opacity: 1;
  outline: 0px;
  text-align: center;
  text-overflow: ellipsis;
  transition: all 200ms ease 0s;
  user-select: none;
  word-break: normal;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:active &:hover {
    background-color: #f3f6fb;
  }
`;