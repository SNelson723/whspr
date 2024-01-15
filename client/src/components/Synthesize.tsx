import React, { BaseSyntheticEvent, useState } from 'react';
import SynthDaw from './synthComponents/SynthDaw';
import { Container, Modal, Button } from 'react-bootstrap';
import * as Tone from 'tone';
import { useLoaderData } from 'react-router-dom';

interface Props {
  audioContext: AudioContext
}

interface Options {
  oscillator: Tone.Oscillator
  fatOscillator: Tone.FatOscillator
  fmOscillator: Tone.FMOscillator
  amOscillator: Tone.AMOscillator
}

interface ModalToggle {
  oscType: boolean
  waveType: boolean
  phaser: boolean
  distortion: boolean
}

const Synthesize = ({ audioContext }: Props): React.JSX.Element => {
  const user: any = useLoaderData();

  const [toggleInfo, setToggleInfo] = useState<ModalToggle>({
    oscType: false,
    waveType: false,
    phaser: false,
    distortion: false
  });

  console.log('CHECKING THE MODAL', toggleInfo)

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const handleInfoToggle: (event: BaseSyntheticEvent) => void = (event) => {
    const id: string = event.target.id;
    setToggleInfo({ ...toggleInfo, [id]: !toggleInfo[id] });
    setToggleModal(!toggleModal);
  };

  const oscillatorOptions: Options = {
    oscillator: new Tone.Oscillator().toDestination(),
    fatOscillator: new Tone.FatOscillator().toDestination(),
    fmOscillator: new Tone.FMOscillator().toDestination(),
    amOscillator: new Tone.AMOscillator().toDestination()
  }

  const phaseFilter: Tone.Phaser = new Tone.Phaser({
    frequency: 15,
    Q: 10,
    octaves: 4,
    wet: 0.5
  }).toDestination();

  const distortionFilter: Tone.Distortion = new Tone.Distortion().toDestination();
  distortionFilter.wet.value = 0.5;
  distortionFilter.distortion = 0.5;

  return (
    <Container className="p-3 rounded w-75">
      <Modal show={toggleModal} centered>
        <Modal.Header>
          {toggleInfo.oscType ? "Oscillator" : null}
          {toggleInfo.waveType ? "Wave Type" : null}
          {toggleInfo.phaser ? "Phaser Filter" : null}
          {toggleInfo.distortion ? "Distortion Filter" : null}
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          {toggleInfo.oscType ? <Button id='oscType' onClick={handleInfoToggle} className="btn btn-dark activeButton">Got it!</Button> : null}
          {toggleInfo.waveType ? <Button id='waveType' onClick={handleInfoToggle} className="btn btn-dark activeButton">Got it!</Button> : null}
          {toggleInfo.phaser ? <Button id='phaser' onClick={handleInfoToggle} className="btn btn-dark activeButton">Got it!</Button> : null}
          {toggleInfo.distortion ? <Button id='distortion' onClick={handleInfoToggle} className="btn btn-dark activeButton">Got it!</Button> : null}
        </Modal.Footer>
      </Modal>
      <div>
        <SynthDaw handleInfoToggle={handleInfoToggle} distortionFilter={distortionFilter} phaseFilter={phaseFilter} user={user} audioContext={audioContext} oscillatorOptions={oscillatorOptions} />
      </div>
    </Container>
  );
};

export default Synthesize;