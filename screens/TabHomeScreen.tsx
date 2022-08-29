import { StyleSheet } from 'react-native';
import { AvenirText } from '../components/StyledComponents';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../constants/types';

export default function TabHomeScreen({ navigation }: RootTabScreenProps<'TabHome'>) {
  return (
    <View style={styles.container}>
      <AvenirText style={styles.title}>Home Screen</AvenirText>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
