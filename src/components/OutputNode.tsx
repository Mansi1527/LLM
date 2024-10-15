import React, { useState } from 'react';

// Define the type for props
interface OutputNodeProps {
  data: {
    label: string; // You can expand this type if needed
  };
}

export const OutputNode: React.FC<OutputNodeProps> = ({ data }) => {
  const [output, setOutput] = useState('No output yet');

  return (
    <div style={{ padding: '10px', background: '#FFB3C1', border: '1px solid #E63946', borderRadius: '5px' }}>
      <strong>{data.label}</strong>
      <div>
        <p>{output}</p>
      </div>
    </div>
  );
};

// import React from 'react';

// interface OutputNodeProps {
//   data: {
//     label: string;
//     output: string;
//   };
// }

// export const OutputNode: React.FC<OutputNodeProps> = ({ data }) => {
//   return (
//     <div style={{ padding: '10px', background: '#FFDDD2', border: '1px solid #F94144', borderRadius: '5px' }}>
//       <strong>{data.label}</strong>
//       <div>
//         <p>{data.output}</p>
//       </div>
//     </div>
//   );
// };