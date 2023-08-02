import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import './ContentModal.css'
import { useQuery } from 'react-query';
import { getData, imgUnavailable,img_500 } from '../util';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { CarCrashOutlined } from '@mui/icons-material';
import { Carousel } from './Carousel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'80%',
  maxWidth: '800px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  fontFamily: 'Motserrat',
  overflowY: 'auto',
  marginTop: 5
};

export const ContentModal=({children,type,id})=> {
  const [open, setOpen] = React.useState(false);

  const urlDetails=`https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_API_KEY}`
  const {data,status}=useQuery(['details',urlDetails],getData)

  const urlVideos=`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`
  const {data:dataVideos,status:statusVideos}=useQuery(['videos',urlVideos],getData)

//status=='success' && console.log(data);
//statusVideos=='success' && console.log(dataVideos.results);  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //console.log(type,id);
  return (
    <div>
      <Button onClick={handleOpen} className="singleContent">{children}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {status=='success' && 
            <div className="content-modal">
                <img src={data.backdrop_path ? img_500+data.backdrop_path : imgUnavailable} alt={data?.name || data?.title} />
                <Box sx={{display: 'flex',flexDirection: 'column'}}>
                    <div><b>{data?.name || data?.title}</b> ({data?.release_date || data?.first_air_date})</div>
                    <div className="tagline"><i>{data.tagline}</i></div>
                    <div className='overview'>{data.overview}</div>
                </Box>
            </div>
            }
            <div>{<Carousel type={type} id={id}></Carousel>}</div>
            {statusVideos=='success' && dataVideos.results.length > 0 &&
                <Button
                    className='video'
                    variant='contained'
                    color='secondary'
                    startIcon={<YouTubeIcon />}
                    target='_blank'
                    href={`https://www.youtube.com/watch?v=${dataVideos.results[0].key}`}
                    >
                        Watch the trailer
                </Button>
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}