
// import React from 'react';

// // Define the type for props
// interface InputNodeProps {
//   data: {
//     label: string; // Define the structure of the data prop here
//     inputText: string; // Add this line if you want to capture inputText
//   };
// }

// export const InputNode: React.FC<InputNodeProps> = ({ data }) => {
//   return (
//     <div style={{ padding: '10px', background: '#D8F3DC', border: '1px solid #40916C', borderRadius: '5px' }}>
//       <strong>{data.label}</strong>
//       <div>
//         <input type="text" placeholder="Enter Input" />
//       </div>
//     </div>
//   );
// };

// import React, { useState } from 'react';

// const InputNode = () => {
//     const [data, setData] = useState({
//         inputText: '',
//         setInputText: (value: any) => setData(prev => ({ ...prev, inputText: value })),
//     });

//     const handleChange = (event: { target: { value: any; }; }) => {
//         const { value } = event.target;
//         data.setInputText(value); // Ensure this function is defined
//     };

//     return (
//         <input 
//             type="text" 
//             value={data.inputText} 
//             onChange={handleChange} 
//         />
//     );
// };

// export default InputNode;
// InputNode.tsx

import React from 'react';

interface InputNodeProps {
  data: {
    label: string;
    inputText: string;
  };
}

export const InputNode: React.FC<InputNodeProps> = ({ data }) => {
  const [inputText, setInputText] = React.useState(data.inputText);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div style={{ padding: '10px', background: '#D8F3DC', border: '1px solid #40916C', borderRadius: '5px' }}>
      <strong>{data.label}</strong>
      <div>
        <input type="text" value={inputText} onChange={handleChange} placeholder="Enter Input" />
      </div>
    </div>
  );
};