import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';


function UnReadArticles() {
    const navigate = useNavigate();
    const [readArticle, unReadArticle] = useState(JSON.parse(localStorage.getItem('unReadArticle')) || [])

    const deleteArticle = ({ name }) => {
        let data = readArticle.filter((item) => {
            return item.title !== name
        });
        unReadArticle(data)
    }
    const goBackClicked = () => {
        navigate('/home')

    }
    return (
        <div>
            <Button style={{ backgroundColor: 'skyBlue', position: 'absolute', top: '0', left: '0' }} onClick={goBackClicked} >Back</Button>
            <Typography style={{ textAlign: 'center' }} variant='h3' gutterBottom={true} >Un Read Articles</Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Card style={{ width: '600px' }} >
                    <List style={{ cursor: 'pointer' }} >
                        {
                            readArticle?.map((sectionItem, index) => {

                                return <ListItem key={sectionItem.abstract}>
                                    <ListItemText
                                        primary={sectionItem.title}

                                        secondary={sectionItem.abstract ? sectionItem.abstract : null}
                                    />
                                    <IconButton edge="end" aria-label="click" onClick={() => deleteArticle({ name: sectionItem.title })} >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            })
                        }
                    </List>
                </Card>
            </div>
        </div>
    )
}

export default UnReadArticles
