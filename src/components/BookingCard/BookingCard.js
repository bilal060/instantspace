/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// Example of Collapsible/Accordion/Expandable List View in React Native
// https://aboutreact.com/collapsible-accordion-expandable-view/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './BookingCard.styles';
// import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';

// import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';

// import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';
import {Profile} from '../../assets/images';
import ProgressiveImage from '../progressiveImage/ProgressiveImage';
import CText from '../cText/CText';
import CIcon from '../cIcon/CIcon';
import GlobalStyle from '../../assets/styling/GlobalStyle';

// Dummy content to show
// You can also use dynamic data by calling web service

const BookingCard = ({
  Active,
  fullName,
  time,
  contact,
  parkingType,
  prize,
  eTime,
  sTime,
  date,
  location,
  item,
}) => {
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [multipleSelect, setMultipleSelect] = useState(false);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const setSections = sections => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{textAlign: 'center'}}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/*Code for Single Collapsible Ends*/}

        {/* <View
            style={{
              backgroundColor: '#000',
              height: 1,
              marginTop: 10,
            }}
          /> */}
        <TouchableOpacity onPress={toggleExpanded}>
          <View style={styles.header}>
            <ProgressiveImage
              source={Profile}
              style={{width: 40, height: 40}}
              resizeMode="contain"
            />
            <View>
              <CText style={styles.titleHeaindg}>Full Name</CText>
              <CText style={styles.nameHeaindg}>{fullName && fullName}</CText>
            </View>
            <View>
              <CText style={styles.titleHeaindg}>Slot Booked</CText>
              <CText style={styles.nameHeaindg}>{time && time}</CText>
            </View>
            <View>
              <CIcon
                type="AntDesign"
                name={collapsed ? 'up' : 'down'}
                size={20}
                color="#7D8695"
              />
            </View>
            {/*Heading of Single Collapsible*/}
          </View>
        </TouchableOpacity>
        {/*Content of Single Collapsible*/}
        <Collapsible collapsed={collapsed} align="center">
          <>
            <View style={[styles.header, {marginTop: -20}]}>
              <View>
                <CText style={styles.titleHeaindg}>Contact No.</CText>
                <CText style={styles.nameHeaindg}>{contact && contact}</CText>
              </View>
              <View>
                <CText style={styles.titleHeaindg}>Space Type</CText>
                <CText style={styles.nameHeaindg}>
                  {parkingType && parkingType}
                </CText>
              </View>
              <View>
                <CText style={styles.titleHeaindg}>Total Amount</CText>
                <CText style={styles.nameHeaindg}>{prize && `$${prize}`}</CText>
              </View>

              {/*Heading of Single Collapsible*/}
            </View>
            <View style={[styles.header, {marginTop: -30}]}>
              <View>
                <CText style={styles.titleHeaindg}>Booking From</CText>
                <CText style={[styles.nameHeaindg, {fontSize: 10}]}>
                  {sTime && sTime?.split(':')[0] + ': ' + sTime?.split(':')[1]}
                </CText>
                <CText
                  style={[styles.nameHeaindg, {marginTop: -10, fontSize: 10}]}>
                  {date && date}
                </CText>
              </View>
              <View>
                <CText style={styles.titleHeaindg}>Booking To</CText>
                <CText style={[styles.nameHeaindg, {fontSize: 10}]}>
                  {eTime && eTime?.split(':')[0] + ': ' + eTime?.split(':')[1]}
                </CText>
                <CText
                  style={[styles.nameHeaindg, {marginTop: -10, fontSize: 10}]}>
                  {date && date}
                </CText>
              </View>
              <View>
                <CText style={styles.titleHeaindg}>Status</CText>
                <CText style={GlobalStyle.activeCard}>
                  {!Active ? 'Active' : 'Paid'}
                </CText>
              </View>
            </View>
            <View style={[styles.header, {marginTop: -30}]}>
              <View>
                <CText style={styles.titleHeaindg}>Branch Location</CText>
                <CText style={styles.nameHeaindg}>{location && location}</CText>
              </View>
            </View>
          </>
        </Collapsible>
        {/* <View style={styles.multipleToggle}>
            <Text
              style={styles.multipleToggle__title}
            >
              Multiple Expand Allowed?
            </Text>
            <Switch
              value={multipleSelect}
              onValueChange={(multipleSelect) =>
                setMultipleSelect(multipleSelect)
              }
            />
          </View> */}

        {/*Code for Accordion/Expandable List starts here*/}
        {/* <Accordion
            activeSections={activeSections}
            // For any default active section
            sections={CONTENT}
            // Title and content of accordion
            touchableComponent={TouchableOpacity}
            // Which type of touchable component you want
            // It can be the following Touchables
            // TouchableHighlight, TouchableNativeFeedback
            // TouchableOpacity , TouchableWithoutFeedback
            expandMultiple={multipleSelect}
            // If you want to expand multiple at a time
            renderHeader={renderHeader}
            // Header Component(View) to render
            renderContent={renderContent}
            // Content Component(View) to render
            duration={400}
            // Duration for Collapse and expand
            onChange={setSections}
            // Setting the state of active sections
          /> */}
        {/*Code for Accordion/Expandable List ends here*/}
      </ScrollView>
    </View>
  );
};

export default BookingCard;
