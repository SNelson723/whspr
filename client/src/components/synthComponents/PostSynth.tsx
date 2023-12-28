import React, { useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import PostCard from '../PostCard';

interface Props {
  synthAudioChunks: Blob[]
  audioContext: AudioContext
  filter: any
}

const PostSynth = ({ filter, audioContext, synthAudioChunks }: Props) => {
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  // setting the new blob to save to the db and cloud
  let audioBlob: Blob;
  if (!audioChunks.length && synthAudioChunks.length) {
    audioBlob = new Blob(synthAudioChunks, { type: 'audio/wav' });
  } else if (audioChunks.length && !synthAudioChunks.length) {
    audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
  }

  return (
    <Container className="d-flex justify-content-center my-3 pt-3 rounded w-75">
      <Stack direction="vertical">
        <PostCard audioContext={audioContext} filter={filter} synthAudioChunks={synthAudioChunks} />
      </Stack>
    </Container>
  );
};

export default PostSynth;