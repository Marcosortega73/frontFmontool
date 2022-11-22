import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Chip, Grid} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/* const fixture = [
  { num_fecha: 1,
    partidos: [{
      equipo_local: 'River', 
      equipo_visitante: 'Boca'
    },
    {
      equipo_local: 'Racing',
      equipo_visitante: 'Independiente'
    },
    {
      equipo_local: 'San Lorenzo',
      equipo_visitante: 'Velez'
    },
    {
      equipo_local: 'Newells',
      equipo_visitante: 'Lanus'
    },
    {
      equipo_local: 'Banfield',
      equipo_visitante: 'Gimnasia'
    }
     
    ]
  },
  { num_fecha: 2,
    partidos: [{
      equipo_local: 'River', 
      equipo_visitante: 'Boca'
    },
    {
      equipo_local: 'Racing',
      equipo_visitante: 'Independiente'
    },
    {
      equipo_local: 'San Lorenzo',
      equipo_visitante: 'Velez'
    },
    {
      equipo_local: 'Newells',
      equipo_visitante: 'Lanus'
    },
    {
      equipo_local: 'Banfield',
      equipo_visitante: 'Gimnasia'
    }
     
    ]
  },
  { num_fecha: 3,
    partidos: [{
      equipo_local: 'River', 
      equipo_visitante: 'Boca'
    },
    {
      equipo_local: 'Racing',
      equipo_visitante: 'Independiente'
    },
    {
      equipo_local: 'San Lorenzo',
      equipo_visitante: 'Velez'
    },
    {
      equipo_local: 'Newells',
      equipo_visitante: 'Lanus'
    },
    {
      equipo_local: 'Banfield',
      equipo_visitante: 'Gimnasia'
    }
     
    ]
  },
  { num_fecha: 4,
    partidos: [{
      equipo_local: 'River', 
      equipo_visitante: 'Boca'
    },
    {
      equipo_local: 'Racing',
      equipo_visitante: 'Independiente'
    },
    {
      equipo_local: 'San Lorenzo',
      equipo_visitante: 'Velez'
    },
    {
      equipo_local: 'Newells',
      equipo_visitante: 'Lanus'
    },
    {
      equipo_local: 'Banfield',
      equipo_visitante: 'Gimnasia'
    }
     
    ]
  },
  { num_fecha: 5,
    partidos: [{
      equipo_local: 'River', 
      equipo_visitante: 'Boca'
    },
    {
      equipo_local: 'Racing',
      equipo_visitante: 'Independiente'
    },
    {
      equipo_local: 'San Lorenzo',
      equipo_visitante: 'Velez'
    },
    {
      equipo_local: 'Newells',
      equipo_visitante: 'Lanus'
    },
    {
      equipo_local: 'Banfield',
      equipo_visitante: 'Gimnasia'
    }
     
    ]
  },
] */




export default function GridComponent({fixture}) {
  console.log("fixture", fixture)
  return (
    <Box 
    sx={{
      flexGrow: 1,
      mb: 2,
      display: "flex",
      flexDirection: "column",
      height: 373,
      overflow: "hidden",
      overflowY: "scroll",
     // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
    }}
    
    
    >
      <Grid container spacing={0}>
       
       
          {
            fixture?.fecha.map((item, index) => (
              <Grid item xs={6} lg={6} key={index} sx={{p:1}}>
                <Item>
                <Box
                id="category-a"
                sx={{ fontSize: '17px', textTransform: 'uppercase', fontWeight: 'bold', color: 'primary.main',pb:1 }}
              >
               <h5>Fecha: {item?.num_fecha}</h5> 
              </Box>
              <Box component="ul" aria-labelledby="category-a" sx={{ pl: 2}}>

                { item.partido.map((partido, index) => (
                  <Box component="li" key={index} sx={{mb:1,p:1,border:"dotted 1px",borderRadius:"5px"}}>
                    <Chip label={partido?.equipo_local?.nombre} size="small"  sx={{mb:1}} /> <strong>vs</strong> <Chip size="small" label={partido?.equipo_visitante?.nombre}/>
                  </Box>
                ))}
            
              </Box>
                </Item>
              </Grid>
            ))

          }
          {/*        <Grid item xs={6} lg={3}>
            <Item>
              <Box
                id="category-a"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Category A
              </Box>
              <Box component="ul" aria-labelledby="category-a" sx={{ pl: 2 }}>
                <li>Link 1.1</li>
                <li>Link 1.2</li>
                <li>Link 1.3</li>
              </Box>
            </Item>
          </Grid> */}
          {/* <Grid item xs={6} lg={3}>
            <Item>
              <Box
                id="category-b"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Category B
              </Box>
              <Box component="ul" aria-labelledby="category-b" sx={{ pl: 2 }}>
                <li>Link 2.1</li>
                <li>Link 2.2</li>
                <li>Link 2.3</li>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={6} lg={3}>
            <Item>
              <Box
                id="category-c"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Category C
              </Box>
              <Box component="ul" aria-labelledby="category-c" sx={{ pl: 2 }}>
                <li>Link 3.1</li>
                <li>Link 3.2</li>
                <li>Link 3.3</li>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={6} lg={3}>
            <Item>
              <Box
                id="category-d"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Category D
              </Box>
              <Box component="ul" aria-labelledby="category-d" sx={{ pl: 2 }}>
                <li>Link 4.1</li>
                <li>Link 4.2</li>
                <li>Link 4.3</li>
              </Box>
            </Item>
          </Grid> */}
        </Grid>
    </Box>
  )
}
