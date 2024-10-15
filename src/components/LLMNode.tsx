// import React, { useState } from 'react';

// // Define the type for props
// interface LLMNodeProps {
//   data: {
//     label: string; // Define the structure of the data prop here
//     modelConfig?: any; // You can specify a more precise type here if known
//   };
// }

// export const LLMNode: React.FC<LLMNodeProps> = ({ data }) => {
//   const [modelConfig, setModelConfig] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setModelConfig(e.target.value);
//   };

//   return (
//     <div style={{ padding: '10px', background: '#CAF0F8', border: '1px solid #0077B6', borderRadius: '5px' }}>
//       <strong>{data.label}</strong>
//       <div>
//         <input
//           type="text"
//           value={modelConfig}
//           onChange={handleChange}
//           placeholder="Model Config"
//         />
//       </div>
//     </div>
//   );
// };

// import React, { useState } from 'react';

// const LLMNode = () => {
//     // Initialize state
//     const [data, setData] = useState({
//         modelConfig: {},
//         setModelConfig: (newConfig: any) => setData(prev => ({ ...prev, modelConfig: newConfig })),
//     });

//     // Handle input change
//     const handleChange = (event: { target: { value: any; }; }) => {
//         const { value } = event.target;
//         console.log(data); // Log to verify structure
//         if (typeof data.setModelConfig === 'function') {
//             data.setModelConfig({ ...data.modelConfig, someKey: value }); // Update modelConfig accordingly
//         } else {
//             console.error('setModelConfig is not defined in data');
//         }
//     };

//     return (
//         <div>
//             <input type="text" onChange={handleChange} />
//         </div>
//     );
// };

// export default LLMNode;


import React from 'react';

interface LLMNodeProps {
  data: {
    label: string;
    modelConfig: any;
  };
}

export const LLMNode: React.FC<LLMNodeProps> = ({ data }) => {
  const [modelConfig, setModelConfig] = React.useState(data.modelConfig);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelConfig(e.target.value);
  };

  return (
    <div style={{ padding: '10px', background: '#CAF0F8', border: '1px solid #0077B6', borderRadius: '5px' }}>
      <strong>{data.label}</strong>
      <div>
        <input type="text" value={modelConfig} onChange={handleChange} placeholder="Model Config" />
      </div>
    </div>
  );
};