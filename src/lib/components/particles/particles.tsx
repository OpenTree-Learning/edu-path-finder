'use client'


import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import type { Container, Engine } from 'tsparticles-engine'

import options from './particles_options.json'



function ParticlesGraph () {

    const particlesInit = useCallback(async (engine: Engine) => {
      await loadSlim(engine)
    }, [])

    return (
        <Particles
          init={particlesInit}
          // @ts-ignore
          options={options}
        />
    )    

}

export default ParticlesGraph