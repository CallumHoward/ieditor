import styled, { css } from "styled-components";

export const QuestionContainer = styled.div<{
  isDragging: boolean;
  mandatory: boolean;
  focused: boolean;
}>`
  padding: 1rem 0 1rem;
  border: 1px solid #dee4ed;
  border-radius: 0.75rem;

  // not working
  &:focus {
    border-color: #6559ff;
  }

  ${(p) => p.focused && `border-color: #6559ff;`}

  box-shadow: ${(p) =>
    p.isDragging
      ? "0 0px 7px rgba(66,66,66,0.08), 0 8px 10px rgba(66,66,66,0.1)"
      : ""};
  background: ${(p) => (p.isDragging ? "#fafafa" : "#ffffff")};
`;

export const OuterContainer = styled.div<{ focusMode: boolean }>`
  &::focus {
    outline: 0px;
  }
  user-select: none;
  padding: ${(p) => (p.focusMode ? "15%" : "0.5rem")} 0;
  transition: padding 500ms ease;
  margin: 0;
  border: 0;
`;

export const InnerContainer = styled.div`
  padding: 0 1rem;
`;

export const QuestionLabel = styled.div`
  // padding-bottom: 1rem;
  margin: 0 0.5rem 1rem;
  text-align: left;
  line-height: 1.5rem;
  cursor: pointer;
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

export const StyledButton = styled.button<{
  active: boolean;
  activeColor?: string;
}>`
  background: #f3f6fb;
  margin: 0 0 0 0.5rem;
  flex: 1;

  padding: 0.75rem 1.25rem;
  background-color: #f9fbfe;
  border: 1px solid #dee4ed;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  opacity: 1;
  outline: 0px;
  text-align: center;
  text-overflow: ellipsis;
  user-select: none;
  word-break: normal;
  text-decoration: none;

  &:hover {
    ${(p) => !p.active && `background: #f3f6fb;`}
  }

  &:active {
    ${(p) => !p.active && `border: 1px solid #6559ff;`}
  }

  background: ${(p) => (p.active ? p.activeColor || `#6559ff` : "#f9fbfe")};
  color: ${(p) => (p.active ? `#f3f6fb` : "#344563")};

  &:focus {
    ${(p) => !p.active && `border: 1px solid #6559ff;`}
  }

  &:first-child {
    margin-left: 0;
  }

  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const StyledInput = styled.input`
  box-sizing: border-box;
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

export const StyledTextArea = styled.textarea`
  resize: vertical;
  box-sizing: border-box;
  width: 100%;
  padding: 0.1rem 0.5rem;
  background-color: #ffffff;
  border: 1px solid #dee4ed;
  border-radius: 0.3rem;
  color: #081833;
  font-size: 1rem;
  font-weight: 400;
  font-family: "Roboto", san-serif;
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
  padding: 1rem 0 0;

  font-size: 12px;
`;

export const InlineButton = styled.button`
  margin: 0px;
  padding: 0.25rem;
  background-color: #f3f6fb;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  color: rgb(52, 69, 99);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.025rem;
  line-height: 1.25rem;
  cursor: pointer;
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

  &:focus {
    border: 1px solid #6559ff;
  }
`;

export const ControlsContainer = styled.div<{ visible: boolean }>`
  transition: opacity 500ms ease 200ms;
  ${({ visible }) =>
    visible
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  margin-bottom: -5rem;
`;
