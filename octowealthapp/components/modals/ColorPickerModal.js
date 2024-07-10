import { Modal, View, ActivityIndicator, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { BaseStyle } from '../../shared/styles';
import { homeButtonBackGround } from '../../constants/colors';
import { heightPercentageToDP as hp } from '../../utils';
import { spacings } from '../../shared/constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign'


const { flex, alignJustifyCenter, width100Percent, positionAbsolute, positionRelative } = BaseStyle;

const ColorPickerModal = ({ modalVisible, onClose, selectedColor }) => {

    return (
        <View style={[flex,alignJustifyCenter, width100Percent]}>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={onClose}
            >
                <View style={[flex, alignJustifyCenter, positionRelative, { backgroundColor: 'rgba(0,0,0, 0.8)' }]}>
                    <TouchableOpacity style={[positionAbsolute, { top: Platform.OS === 'ios' ? spacings.ExtraLarge3x :  spacings.xxxLarge, right: spacings.Large1x}]} onPress={onClose}>
                        <AntDesign name="close" size={35} color={homeButtonBackGround} />
                    </TouchableOpacity>
                    <View style={[width100Percent, { height: hp(50), padding: spacings.xxxxLarge }]}>
                        <ColorPicker
                            // ref={r => { this.picker = r }}
                            color={homeButtonBackGround}
                            swatchesOnly={false}
                            onColorChange={(color) => selectedColor(color)}
                            // onColorChangeComplete={this.onColorChangeComplete}
                            thumbSize={40}
                            sliderSize={40}
                            noSnap={true}
                            row={true}
                            swatchesLast={true}
                            swatches={true}
                            wheelLodingIndicator={<ActivityIndicator size={20} />}
                            sliderLodingIndicator={<ActivityIndicator size={10} />}
                            useNativeDriver={false}
                            useNativeLayout={false}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ColorPickerModal;
