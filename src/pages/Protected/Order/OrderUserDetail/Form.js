import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
import Validations from './Validations';
import {View , TouchableOpacity} from 'react-native';
import {CButton, CInput, CText} from '../../../../components';
import Styles from '../Order.style';
import {themes} from '../../../../theme/colors';

function CForm(props) {
  const {submit, loading , onForgotPress} = props;

  const form = useRef(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const cpassword = useRef(null);

  return (
    <Formik
      innerRef={form}
      onSubmit={values => submit(values)}
      initialValues={{}}
      validationSchema={Validations}>
      {({handleChange, values, handleSubmit, errors}) => {
        return (
          <View>
            <View style={Styles.card}>
              <View style={Styles.cardHeader}>
               
              </View>

              <View style={Styles.cardBody}>
              <CInput
                  ref={email}
                  inputLabel={'Name'}
                  placeholder={'Name'}
                  value={values.email}
                  onChangeText={handleChange('name')}
                  error={errors.email}
                  sec
                  inputInnerContainerStyle={Styles.inputInnerContainerStyle}

                 
                  onSubmitEditing={() => handleSubmit()}
                />
                <CInput
                  ref={email}
                  inputLabel={'Email Address'}
                  placeholder={'Email Address'}
                  value={values.email}
                  inputInnerContainerStyle={Styles.inputInnerContainerStyle}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                  sec
                 
                  onSubmitEditing={() => handleSubmit()}
                />

                <CInput
                  ref={password}
                  inputLabel={'Phone'}
                  placeholder={'Phone'}
                  inputInnerContainerStyle={Styles.inputInnerContainerStyle}
                  
                  value={values.password}
                  onChangeText={handleChange('Phone')}
                  secureTextEntry={true}
                  error={errors.password}
                  returnKeyType="next"
                  onSubmitEditing={() => cpassword.current.focus()}
                  // leftIconType="MaterialCommunityIcons"
                  // leftIconColor={themes.light.colors.fontColor}
                  // leftIconNAme="email"
                  // leftIconeSize={18}
                  // rightIconType="AntDesign"
                  // rightIconName="eyeo"
                  // rightIconeColor={themes.light.colors.gray4}
                  // rightIconeSize={18}
                />
              </View>
              

            
            </View>
          </View>
        );
      }}
    </Formik>
  );
}
export default memo(CForm);
