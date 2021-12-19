import React, { useState, useEffect } from 'react'

import AppBarComponent from './AppBarComponent';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import { getAllSection } from '../ApiUtils'
import { API_KEY, SECTION_API_URL, ARTICLE_API_URL } from '../ApiUtils'
import axios from 'axios'
import TablePagination from '@mui/material/TablePagination';
import MouseIcon from '@mui/icons-material/Mouse';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import IconButton from '@mui/material/IconButton';
import { articleResult } from './Json';
import MarkUnreadChatAlt from '@mui/icons-material/MarkUnreadChatAlt';
import { useNavigate } from 'react-router-dom';


function Home() {
    let articleArray = []
    const navigate = useNavigate();
    const [sectionData, setSectionData] = useState(null);
    const [newsArticleData, setNewsArticleData] = useState(null);
    const [unReadSessionItem, setUnReadSessionItem] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        axios.get(`${SECTION_API_URL}api-key=${API_KEY}`)
            .then(res => {
                setSectionData(res.data.results)
            })
    }, [])

    useEffect(() => {
        axios.get(`${ARTICLE_API_URL}api-key=${API_KEY}&page=${page}&limit=${size}`)
            .then(res => {
                setNewsArticleData(res.data.results)
            })
    }, [page, size])

    const handleSectionClick = ({ name }) => {
        let filteredArray = newsArticleData.map((articleItem) => {
            if (articleItem.section === name) {
                return articleItem
            }
        }).filter((item) => item !== undefined)
        if (filteredArray?.length > 0) {

            setNewsArticleData(filteredArray)
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setSize(parseInt(event.target.value, 10))
        setPage(0);
    };

    const handleUnReadItem = ({ sectionItem }) => {
        articleArray.push(sectionItem)
        localStorage.setItem('unReadArticle', JSON.stringify(articleArray))

    }

    const handleUnReadArticle = () => {
        navigate('/unReadArticles')
    }

    return (
        <div >
            <AppBarComponent />
            <br></br>
            <br></br>
            <br></br>
            <div style={{ overflow: 'auto' }}>
                <TablePagination
                    component="div"
                    count={100 || newsArticleData?.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={size}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Button style={{ backgroundColor: 'skyBlue' }} onClick={handleUnReadArticle} >UnReadArticle</Button>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Card style={{ width: '250px' }} >
                        <List style={{ cursor: 'pointer' }} >
                            {
                                sectionData?.map((sectionItem, index) => {

                                    return <ListItem key={index}>


                                        <ListItemText
                                            primary={sectionItem.display_name}


                                        // secondary={secondary ? 'Secondary text' : null}

                                        />
                                        <IconButton edge="end" aria-label="click" onClick={() => handleSectionClick({ name: sectionItem.display_name })} >
                                            <MouseIcon />
                                        </IconButton>
                                    </ListItem>
                                })
                            }
                        </List>
                    </Card>

                    <Card style={{ width: '600px' }} >
                        <List style={{ cursor: 'pointer' }} >
                            {
                                newsArticleData?.map((sectionItem, index) => {

                                    return <ListItem key={sectionItem.abstract}>
                                        <ListItemText
                                            primary={sectionItem.title}

                                            secondary={sectionItem.abstract ? sectionItem.abstract : null}
                                        />
                                        <IconButton edge="end" aria-label="click" onClick={() => handleUnReadItem({ sectionItem: sectionItem })} >
                                            <MarkUnreadChatAlt />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="click" onClick={() => handleSectionClick({ name: sectionItem.display_name })} >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                })
                            }
                        </List>
                    </Card>
                </div>

            </div>



        </div>
    )
}

export default Home
