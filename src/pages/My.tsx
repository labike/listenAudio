import React, { useState } from 'react'
import { Image, ImageBackground, StatusBar, StyleSheet, View } from 'react-native'

const My = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  const getContent = () => {

  }

  const renderDashboard = () => {
    return (
      <ImageBackground style={styles.imgBg} source={}>
        <View style={styles.titlaBar}>
          <Image style={styles.iconMenu} source={} />
          <Image style={styles.iconShare} source={} />
        </View>

        <View style={styles.infoLayout}>
          <View style={styles.avatarLayout}>
            <Image style={styles.avatarImg} source={} />
            <Image style={styles.iconAdd} source={} />
            <View style={styles.nameLayout}>
              <Text style={styles.nameTxt}>大公爵</Text>
              <View style={styles.idLayout}>
                <Text style={styles.idTxt}>小红书号:</Text>
                <Image style={styles.iconCode} source={} />
              </View>
            </View>
          </View>
          
        </View>
      </ImageBackground>
    )
  }

  function renderTabs(): string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined {
    
  }

  function renderModal(): string | number | boolean | {} | React.ReactNodeArray | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined {
    
  }

  return (
    <View>
      <StatusBar
        barStyle='light-content'
        translucent={true}
        backgroundColor='transparent'
      />
      {renderDashboard()}
      {renderTabs()}
      {renderModal()}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5'
  },
  imgBg: {
    width: '100%',
    padding: 20,
  },
  titleBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    margin: 16,
  },
  avatarLaayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  avatarImg: {
    width: 86,
    height: 86,
    borderRadius: 48,
    backgroundColor: 'white',
  },
  iconAdd: {
    width: 24,
    height: 24,
    marginLeft: -20,
    marginBottom: 2,
  },
  nameLayout: {
    flexDirection: 'column',
    marginBottom: 16,
    marginLeft: 8,
  },
  nameTxt: {
    fontSize: 22,
    color: 'white'
  }
})

export default My
