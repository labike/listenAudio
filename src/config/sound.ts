import Sound from 'react-native-sound';

Sound.setCategory('Playback');

let sound: Sound;

const init = (url: string) => {
  return new Promise((resolve, reject) => {
    sound = new Sound(url, '', error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const play = () => {
  return new Promise((resolve, reject) => {
    if (sound) {
      sound.play(success => {
        if (success) {
          resolve();
        } else {
          reject();
        }
      });
    } else {
      reject();
    }
  });
};

const pause = () => {
  return new Promise(resolve => {
    if (sound) {
      sound.pause(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

// 获取当前播放时间
const getCurrentTime = (): Promise<number> => {
  return new Promise(resolve => {
    if (sound && sound.isLoaded()) {
      sound.getCurrentTime(resolve);
    } else {
      resolve(0);
    }
  });
};

// 获取音频时长
const getDuration = () => {
  if (sound) {
    return sound.getDuration();
  }
  return 0;
};

const stop = () => {
  return new Promise(resolve => {
    if (sound) {
      sound.stop(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

export {init, play, pause, getCurrentTime, getDuration, stop};
