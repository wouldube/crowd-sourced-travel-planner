import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Button } from '@mui/material';

const ExperiencesMap = ({ setExpId }) => {
  /* The Experiences & Randomization */
  const [randomizedExperiences, setRandomizedExperiences] = useState([])
  const [curveA, setCurveA] = useState({ x: 0, y: 0 })
  const [curveB, setCurveB] = useState({ x: 1, y: 1 })

  const getExperiences = async () => {
    try {
      const data = await fetch("http://localhost:5000/experiences")
      const experiences = await data.json()

      let randoms = []
      for (let i = 0; i < 15; i++) {
        let randomnum = Math.floor(Math.random() * (experiences.length - 1))
        randoms.push(experiences[randomnum])
      }

      setRandomizedExperiences(randoms)
    } catch (error) { console.error('Error fetching data:', error) }
  }

  /* Navigation */
  const navigate = useNavigate()

  const goToExperience = (expId) => {
    setExpId(expId)
    navigate(`/experience`)
  }

  /* Map Illustration */
  // Experiences Points
  let mappoints = []
  for (let i = 0; i < 15; i++) {
    mappoints.push(Math.floor(Math.random() * 6) + 2)
  }

  // Connections Lines
  let exppos = []
  for (let i = 0; i < 15; i++) {
    exppos.push(useRef(null))
  }

  const aCurve = (x1, y1, x2, y2, x3, y3) => {
    console.log(`${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`)

    return (
      <svg width="400" height="400" style={{ position: 'absolute', left: x1.x, top: y1.y }}>
        <path d={`M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`} fill="none" stroke="black" strokeWidth="2" />
        <>
          {console.log(`DREW THEM`)}
        </>
      </svg>

    )
  }

  // const curves = async (a, b) => {
  //   console.log(`${exppos.length}`)
  //   console.log(`${randomizedExperiences.length}`)
  //   if (a && a.current) {
  //     let x1 = a.current.getBoundingClientRect().bottom
  //     let y1 = x1
  //     let x3 = b.current.getBoundingClientRect().top
  //     let y3 = x3
  //     let x2 = x1 // x3 - x1
  //     let y2 = x2
  //     return (aCurve(x1, y1, x2, y2, x3, y3))
  //   } else {console.log('false')}
  // }

  const curves = (a, b) => {
    console.log(`${exppos.length}`)
    console.log(`${randomizedExperiences.length}`)
    // if (exppos[2].current) {
    // for (let i = 0; i < exppos.length - 1; i++) {
    //if (!(a.current)) {
    // return aCurve(100, 0, 50, 150, 500, 150)

    // } else {
    // let x1 = a.current.getBoundingClientRect().bottom
    // let y1 = x1
    // let x3 = b.current.getBoundingClientRect().bottom + 500
    // let y3 = x3 + 500
    // let x2 = x1 // x3 - x1
    // let y2 = x2
    // console.log(`LOOP:${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`)

    // return aCurve(x1, y1, x2, y2, x3, y3)
    // }
    // }
    // }
  }


  useEffect(() => {
    getExperiences()
  }, [])

  useEffect(() => {
    if (exppos[1].current) {
      const curveA = exppos[0].current.getBoundingClientRect()
      const curveB = exppos[1].current.getBoundingClientRect()
      setCurveA({ x: curveA.x, y: curveA.y })
      setCurveB({ x: curveB.x, y: curveB.y })
    }
  }, [])

  // useEffect(() => {
  //   curves(null, null)
  // }, [randomizedExperiences])

  // useEffect(() => {
  //   // curves()
  //   if (exppos[exppos.length - 1]) {
  //     setcheck(1)
  //   }
  // }, [exppos])


  return (
    <Container>
      <h3>Explore the Map of Experiences!</h3>
      <p>roam around & click one</p>
      {randomizedExperiences && (
        <Grid container spacing={1}>
          {randomizedExperiences.map((exp, index) => (
            <>
              <Grid item xs={mappoints[index]} key={index}>
                <Card variant="experience" onClick={() => { goToExperience(exp._id) }}
                  ref={exppos[index]} style={{
                    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3), rgba(246, 225, 161, 0.3)), url(${exp.images[0]})`
                  }}>
                  <Container><h3>{exp.title}</h3></Container>
                </Card>
              </Grid>
              {index > 0 && (
                <>
                {/* {console.log(`${curveA.x} ${curveA.y} Q ${curveA.x} ${curveA.y} ${curveB.x}`)} */}
                  <svg width="100" height="100" style={{ left: curveA.x, top: curveA.y }}>
                  <path d={`M ${curveA.x} ${curveA.y} Q ${curveA.x} ${curveA.y} ${curveB.x} ${curveB.y}`} fill="none" stroke="black" strokeWidth="2" />
                  {/* <path d={`M 50 50 Q 100 300 500 500`} fill="none" stroke="black" strokeWidth="2" /> */}
                  </svg>
                </>
              )}
            </>
          ))}
        </Grid>
      )
      }
    </Container >
  )
}

export default ExperiencesMap
