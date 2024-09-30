declare module 'react-text-mask' {
    import * as React from 'react';
  
    export interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
      mask: (string | RegExp)[];
      placeholderChar?: string;
      showMask?: boolean;
      keepCharPositions?: boolean;
    }
  
    // Declare the MaskedInput class with the input property
    export default class MaskedInput extends React.Component<MaskedInputProps> {
      input: HTMLInputElement; // Reference to the actual input element
    }
  }
  