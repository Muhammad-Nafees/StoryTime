import React from 'react'
import { View ,Text } from 'react-native'
import FAQ from  "../../assets/svgIcons/task.svg"
import PencilIcon from "../../assets/svgIcons/pencil.svg"
import BlockUser from "../../assets/svgIcons/blockUser.svg"
import ProfileIcon from "../../assets/svgIcons/profile.svg"
import DeleteAccount from "../../assets/svgIcons/trash.svg"
import TermsConditions from "../../assets/svgIcons/document.svg"
import PrivacyPolicy from "../../assets/svgIcons/stickyNotes.svg"
import ForwardArrow from "../../assets/svgIcons/forwardArrow.svg"
import Notifications from "../../assets/svgIcons/notification.svg"
import Subscription from "../../assets/svgIcons/paymentSetting.svg"
import ReportAProblem from "../../assets/svgIcons/reportProblem.svg"
import PencilEdit from "../../assets/svgIcons/pencil_edit.svg"


const SvgIcons = ({name, height, width,backgroundColor='transparent'}) => {

switch (name) {
    case 'ProfileIcon': return( <ProfileIcon width={width} height={height} style={{backgroundColor:backgroundColor}}/>);
    case 'PencilIcon': return( <PencilIcon width={width} height={height} style={{backgroundColor:backgroundColor}}/>);
    case 'ForwardArrow': return( <ForwardArrow width={width} height={height} style={{backgroundColor:backgroundColor}}/>);
    case 'Notifications': return( <Notifications width={width} height={height} style={{backgroundColor:backgroundColor}}/>);
    case 'Subscription':
    case 'PaymentSettings': return( <Subscription width={width} height={height} style={{backgroundColor:backgroundColor}}/>);
    case 'ReportAProblem': return( <ReportAProblem width={width} height={height} style={{backgroundColor:backgroundColor}}/>);
    case 'BlockUser': return( <BlockUser width={width} height={height} style={{backgroundColor:backgroundColor}}/>);
    case 'DeleteAccount': return( <DeleteAccount width={width} height={height} style={{backgroundColor:backgroundColor}}/>);
    case 'TermsConditions': return( <TermsConditions width={width} height={height} style={{backgroundColor:backgroundColor}}/>);
    case 'PrivacyPolicy': return( <PrivacyPolicy width={width} height={height} style={{backgroundColor:backgroundColor}}/>);
    case 'FAQ': return( <FAQ width={width} height={height} style={{backgroundColor:backgroundColor}}/>);
    case 'PencilEdit': return( <PencilEdit width={width} height={height} style={{backgroundColor:backgroundColor}}/>);



    default:
      return (
        <View style={{backgroundColor:backgroundColor}}>
        {/* <MaterialIcons
        name ={'image'}
        color= {color}
        size={((Number(height)+ Number(width))/2)}
        /> */}
        <Text>image</Text>
        </View>
      );
    }
};

export default SvgIcons