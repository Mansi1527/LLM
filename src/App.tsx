import { useState, useCallback } from 'react';
import axios from 'axios';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  Background,
  NodeChange,
  EdgeChange,
  Connection,
  Edge,
  Node,
} from 'react-flow-renderer';
import { InputNode } from './components/InputNode';
import { LLMNode } from './components/LLMNode';
import { OutputNode } from './components/OutputNode';

// Define initial nodes and edges
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'inputNode',
    position: { x: 250, y: 5 },
    data: { label: 'Input Node', inputText: '' },
  },
  {
    id: '2',
    type: 'llmNode',
    position: { x: 250, y: 100 },
    data: { label: 'LLM Node', modelConfig: {} },
  },
  {
    id: '3',
    type: 'outputNode',
    position: { x: 250, y: 200 },
    data: { label: 'Output Node', output: '' },
  },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
  inputNode: InputNode,
  llmNode: LLMNode,
  outputNode: OutputNode,
};

const App = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // Handle node changes
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Handle node connections (Input -> LLM -> Output)
  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const { source, target } = params;

      // Define valid connection rules
      if (
        (source === '1' && target === '2') || // Input -> LLM
        (source === '2' && target === '3') // LLM -> Output
      ) {
        setEdges((eds) => addEdge(params, eds));
      } else {
        alert('Invalid connection! Follow Input -> LLM -> Output flow.');
      }
    },
    []
  );

  // Handle workflow execution
  const handleRunWorkflow = async () => {
    const inputNode = nodes.find((node) => node.type === 'inputNode');
    const llmNode = nodes.find((node) => node.type === 'llmNode');
    const outputNodeIndex = nodes.findIndex((node) => node.type === 'outputNode');

    // Check if the required nodes are found
    if (!inputNode || !llmNode || outputNodeIndex === -1) {
      console.error('One or more nodes are not defined.');
      alert('Please ensure that all nodes (Input, LLM, Output) are properly connected.');
      return;
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          inputText: inputNode.data.inputText,
          modelConfig: {
            model: llmNode.data.modelName,
            temperature: llmNode.data.temperature,
            maxTokens: llmNode.data.maxTokens,
            topP: llmNode.data.topP,
            frequencyPenalty: llmNode.data.frequencyPenalty,
            presencePenalty: llmNode.data.presencePenalty,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const updatedNodes = [...nodes];
      updatedNodes[outputNodeIndex].data.output = response.data.choices[0].message.content; // Updated result handling
      setNodes(updatedNodes);
    } catch (error: any) {
      console.error('Error during API call:', error.response ? error.response.data : error.message);
      alert('An error occurred while calling the API. Please try again.');
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        
        <Background />
        <Controls />
        <button onClick={handleRunWorkflow} style={{ marginTop: '10px', padding: '10px' }}>
        Run Workflow
      </button>
      </ReactFlow>
      
    </div>
  );
};

export default App;
