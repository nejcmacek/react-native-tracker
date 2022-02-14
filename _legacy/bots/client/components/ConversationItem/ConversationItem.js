import { accent } from '../../screens/helpers/defaults';
import * as React from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
export default class Conversationitem extends Component {
    setNativeProps(data) {
        // console.log("received native props")
    }
    render() {
        return (React.createElement(View, { style: styles.outer },
            React.createElement(View, { style: styles.icon },
                React.createElement(Text, { style: styles.iconText }, this.props.chat.shortName)),
            React.createElement(View, { style: styles.inner },
                React.createElement(Text, { style: styles.name }, this.props.chat.name),
                React.createElement(Text, { style: styles.description }, this.props.chat.description))));
    }
}
const styles = StyleSheet.create({
    outer: {
        height: 64,
        maxHeight: 64,
        padding: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'flex-start',
        backgroundColor: 'white'
    },
    inner: {
        flex: 2,
        paddingLeft: 8
    },
    icon: {
        height: 48,
        width: 48,
        backgroundColor: accent,
        alignContent: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 24,
    },
    iconText: {
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: 16
    },
    name: {
        fontSize: 16
    },
    description: {
        color: '#aaa',
        fontSize: 12
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udmVyc2F0aW9uSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvbnZlcnNhdGlvbkl0ZW0udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4RCxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUM5QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBQ2pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQVdyRCxNQUFNLENBQUMsT0FBTyx1QkFBd0IsU0FBUSxTQUEyQjtJQUV4RSxjQUFjLENBQUMsSUFBUztRQUN2Qix1Q0FBdUM7SUFDeEMsQ0FBQztJQUVELE1BQU07UUFDTCxNQUFNLENBQUMsQ0FDTixvQkFBQyxJQUFJLElBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ3hCLG9CQUFDLElBQUksSUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUk7Z0JBQ3ZCLG9CQUFDLElBQUksSUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQVEsQ0FDMUQ7WUFDUCxvQkFBQyxJQUFJLElBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2dCQUN4QixvQkFBQyxJQUFJLElBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFRO2dCQUN2RCxvQkFBQyxJQUFJLElBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFRLENBQy9ELENBQ0QsQ0FDUCxDQUFBO0lBQ0YsQ0FBQztDQUVEO0FBRUQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxLQUFLLEVBQUU7UUFDTixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxFQUFFO1FBQ2IsT0FBTyxFQUFFLENBQUM7UUFDVixJQUFJLEVBQUUsQ0FBQztRQUNQLGFBQWEsRUFBRSxLQUFLO1FBQ3BCLGNBQWMsRUFBRSxZQUFZO1FBQzVCLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLFlBQVksRUFBRSxZQUFZO1FBQzFCLGVBQWUsRUFBRSxPQUFPO0tBQ3hCO0lBQ0QsS0FBSyxFQUFFO1FBQ04sSUFBSSxFQUFFLENBQUM7UUFDUCxXQUFXLEVBQUUsQ0FBQztLQUNkO0lBQ0QsSUFBSSxFQUFFO1FBQ0wsTUFBTSxFQUFFLEVBQUU7UUFDVixLQUFLLEVBQUUsRUFBRTtRQUNULGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLFlBQVksRUFBRSxRQUFRO1FBQ3RCLGFBQWEsRUFBRSxRQUFRO1FBQ3ZCLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLFlBQVksRUFBRSxFQUFFO0tBQ2hCO0lBQ0QsUUFBUSxFQUFFO1FBQ1QsU0FBUyxFQUFFLFFBQVE7UUFDbkIsVUFBVSxFQUFFLEtBQUs7UUFDakIsUUFBUSxFQUFFLEVBQUU7S0FDWjtJQUNELElBQUksRUFBRTtRQUNMLFFBQVEsRUFBRSxFQUFFO0tBQ1o7SUFDRCxXQUFXLEVBQUU7UUFDWixLQUFLLEVBQUUsTUFBTTtRQUNiLFFBQVEsRUFBRSxFQUFFO0tBQ1o7Q0FDRCxDQUFDLENBQUEifQ==