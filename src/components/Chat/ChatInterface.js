import './ChatInterface.css'; // Importing the CSS file
import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import Layout from '../Layout'; // Import the Layout component
import { sendChatMessage, fetchChatMessages } from '../../services/api'; // Importing the functions from api.js
import { Typography, Box, Button, TextField, Paper } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MathJax from 'react-mathjax2';



function ChatInterface() {
    console.log('ChatInterface component function invoked');
    const [chatInput, setChatInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [conversationId, setConversationId] = useState(uuidv4());
    const [userConversationNumber, setUserConversationNumber] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        console.log('ChatInterface component mounted');
    }, []);

    const handleChatInputChange = (event) => {
        setChatInput(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleChatSubmit = async () => {
        if (chatInput.trim() || selectedFile) {
            const message = chatInput.trim();
            setChatInput(''); // Clear input after sending

            try {
                console.log('Sending chat message');
                // Add the user's message to the chat history immediately
                setChatHistory(prevHistory => [
                    ...prevHistory,
                    { role: 'user', content: message, file: selectedFile ? selectedFile.name : null }
                ]);

                const response = await sendChatMessage(conversationId, message, selectedFile);

                console.log('Received response:', response.data.response);

                // Add the assistant's response to the chat history
                setChatHistory(prevHistory => [
                    ...prevHistory,
                    { role: 'assistant', ... response.data }
                ]);
                setSelectedFile(null); // Clear the selected file
            } catch (error) {
                console.error('Error updating conversation:', error);
            }
        }
    };



    const handleClearChat = () => {
        setChatHistory([]); // Clear chat history
        setConversationId(uuidv4()); // Generate a new conversation ID
        setUserConversationNumber(prevNumber => prevNumber + 1); // Increment conversation number
        setSelectedFile(null); // Clear the selected file
    };

    useEffect(() => {
        const fetchConversation = async () => {
            console.log('Fetching conversation');
            try {
                const response = await fetchChatMessages(conversationId);
                if (response.data && response.data.messages) {
                    setChatHistory(response.data.messages);
                    console.log('Fetched messages:', response.data.messages);
                }
            } catch (error) {
                console.error('Error fetching conversation:', error);
            }
        };

        fetchConversation();
    }, [conversationId]);


    return (
        <Layout>
            <Box p={3}>
                <Typography variant="h4" gutterBottom>Chat</Typography>
                <Paper style={{ padding: 16, marginBottom: 16 }}>
                    <Box className="chat-display" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        {chatHistory.map((msg, index) => (
                            <Box key={index} style={{ marginBottom: '1em' }}>
                                {/* Render user messages */}
                                {msg.role === 'user' && (
                                    <Typography
                                        variant="body1"
                                        className="user-message"
                                        style={{ textAlign: 'right' }} // Align user messages to the right
                                    >
                                        {msg.content}
                                    </Typography>
                                )}
    
                                {/* Render assistant/chatbot messages with LaTeX */}
                                {msg.role === 'assistant' && msg.chatbot_response && (
                                    <MathJax.Context input="tex">
                                        <Typography
                                            variant="body1"
                                            className="bot-message"
                                            style={{ textAlign: 'left' }} // Align assistant messages to the left
                                        >
                                            <MathJax.Text text={msg.chatbot_response} />
                                        </Typography>
                                    </MathJax.Context>
                                )}
    
                                {/* Render LaTeX equations */}
                                {msg.equation && (
                                    <MathJax.Context input="tex">
                                        <div>
                                            <MathJax.Text text={`\\[${msg.equation}\\]`} />
                                        </div>
                                    </MathJax.Context>
                                )}
                                {msg.image && <img src={msg.image} alt="Image" style={{ maxWidth: 400 }} />}
                                {msg.svg && (
                                    <Box>
                                        <img 
                                            src={msg.svg} 
                                            alt="SVG Image" 
                                            style={{ 
                                                width: '100%',     // Adjusts to the full width of the screen
                                                height: 'auto',    // Auto-adjusts height to maintain aspect ratio
                                                maxWidth: '40vw', // Ensures it doesn't exceed the screen width
                                                maxHeight: '60vh' // Ensures it doesn't exceed the screen height
                                            }} 
                                        />
                                    </Box>
                                )}
                                {msg.tabular_data && Object.keys(msg.tabular_data).length > 0 && (
                                        <Box>
                                            <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
                                                <thead>
                                                    <tr>
                                                        {msg.tabular_data.headers.map((header, index) => (
                                                            <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{header}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {msg.tabular_data.rows.map((row, rowIndex) => (
                                                        <tr key={rowIndex}>
                                                            {msg.tabular_data.headers.map((header, colIndex) => (
                                                                <td key={colIndex} style={{ border: '1px solid black', padding: '8px' }}>
                                                                    {row[header]}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </Box>
                                    )}

                                {/* Render question content with LaTeX */}
                                {msg.question_content && (
                                    <MathJax.Context input="tex">
                                        <Typography variant="body1">
                                            <MathJax.Text text={msg.question_content} />
                                        </Typography>
                                    </MathJax.Context>
                                )}
    
                                {/* Render LaTeX in choices */}
                                {msg.choices && Object.keys(msg.choices).length > 0 && (
                                    <MathJax.Context input="tex">
                                        <Box>
                                            <ul>
                                                {Object.entries(msg.choices).map(([key, value]) => (
                                                    <li key={key}>
                                                        <MathJax.Text text={`${key}: ${value}`} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </Box>
                                    </MathJax.Context>
                                )}
                                                                {/* Render other elements */}


                            </Box>
                        ))}
                    </Box>
    
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={chatInput}
                        onChange={handleChatInputChange}
                        placeholder="Type your message..."
                        onKeyDown={event => event.key === 'Enter' && handleChatSubmit()}
                        style={{ marginBottom: 16 }}
                    />
                    <input
                        type="file"
                        id="file-input"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-input">
                        <Button component="span" variant="outlined" startIcon={<AttachFileIcon />}>
                            Attach File
                        </Button>
                    </label>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="contained" color="primary" onClick={handleChatSubmit}>Send Message</Button>
                        <Button variant="contained" color="secondary" onClick={handleClearChat}>Clear Chat</Button>
                    </Box>
                </Paper>
            </Box>
        </Layout>
    );
}

export default ChatInterface;