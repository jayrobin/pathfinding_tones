import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <h1>Hello, world</h1>
      </div>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
};
