import React, { useState } from 'react';
import Grid from './components/Grid';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import Modal from './components/Modal';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App">
      <Header/>
      <UploadForm />
      <Grid setSelectedImg={setSelectedImg} />
      { selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;