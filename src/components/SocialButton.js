import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default function SocialButton({ title, imageType, color }) {
  let imageSource;

  if (imageType === 'facebook') {
    imageSource = require('../../assets/facebook.png');
  } else if (imageType === 'google') {
    imageSource = require('../../assets/google.png');
  } else if (imageType === 'twitter') {
    imageSource = require('../../assets/twitter.png');
  } 

  const buttonStyle = {
    backgroundColor: color, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 30,
    height: 50,
    padding: 15,
    marginVertical: 10,
    width: '80%',
  };

  return (
    <TouchableOpacity style={buttonStyle}>
      <Image source={imageSource} style={{ width: 20, height: 20, marginRight: 10 }} />
      <Text style={{ fontFamily: Fonts.family.bold, color: 'white', fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
  );
}
