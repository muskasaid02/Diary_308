import { useEffect } from 'react';
import { HashLoader } from 'react-spinners';
import { usePostsContext } from '../hooks/usePostsContext.js';
import { useAuthContext } from '../hooks/useAuthContext.js';
import PostHead from '../components/PostHead';
import PostForm from '../components/PostForm';
import { 
  Box,
  Typography,
  Paper
} from '@mui/material';

const Home = () => {
    const { posts, dispatch } = usePostsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('https://diary-backend-utp0.onrender.com/api/posts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) dispatch({ type: 'SET_POSTS', payload: json });
        }

        if (user) fetchPosts();
    }, [user, dispatch]);

    if (!posts) {
        return (
            <Box 
                sx={{
                    position: 'fixed',  
                    top: '50%',        
                    left: '50%',       
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000       
                }}
            >
                <HashLoader
                    color="#36d7b7"
                    size={200}
                />
            </Box>
        );
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{ 
                position: 'absolute',
                right: '24px',
                left: '5px',
                top: '20px',
                width: '95%'
            }}>
                <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                    Posts
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {posts && posts.map(post => (
                        <Paper 
                            key={post._id}
                            elevation={1}
                            sx={{
                                p: 2,
                                backgroundColor: 'white',
                                borderRadius: 1
                            }}
                        >
                            <PostHead post={post} />
                        </Paper>
                    ))}
                </Box>
            </Box>

            <Box sx={{ 
                position: 'absolute',
                left: '24px',
                top: '24px',
                width: '350%'
            }}>
                <PostForm />
            </Box>
        </Box>
    );
};

export default Home;