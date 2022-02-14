import * as React from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as defaults from "../../screens/helpers/defaults";
export default class MessageItem extends Component {
    constructor(props) {
        super(props);
        this.state = this.calculateState();
    }
    calculateState() {
        const { msg, flatBottom = false, flatTop = false } = this.props;
        const right = msg.sender; // align right?
        return {
            style: {
                alignSelf: right ? 'flex-end' : 'flex-start',
                borderTopLeftRadius: flatTop ? 4 : 16,
                borderTopRightRadius: flatTop ? 4 : 16,
                borderBottomLeftRadius: flatBottom ? 4 : 16,
                borderBottomRightRadius: flatBottom ? 4 : 16,
                backgroundColor: msg.sender ? defaults.accent : defaults.secondary,
                marginBottom: flatBottom ? 2 : 8
            }
        };
    }
    setNativeProps(data) {
        // console.log("received native props")
    }
    render() {
        return (React.createElement(View, { style: [styles.outer, this.state.style] },
            React.createElement(Text, null, this.props.msg.text)));
    }
}
const styles = StyleSheet.create({
    outer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: defaults.accent,
        margin: 8,
        marginTop: 0,
        flexGrow: 0
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNZXNzYWdlSXRlbS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUE7QUFDOUIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUNqQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFHckQsT0FBTyxLQUFLLFFBQVEsTUFBTSxnQ0FBZ0MsQ0FBQztBQWEzRCxNQUFNLENBQUMsT0FBTyxrQkFBbUIsU0FBUSxTQUEyQjtJQUVuRSxZQUFZLEtBQWM7UUFDekIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7SUFDbkMsQ0FBQztJQUVELGNBQWM7UUFDYixNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsR0FBRyxLQUFLLEVBQUUsT0FBTyxHQUFHLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDL0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQSxDQUFDLGVBQWU7UUFDeEMsTUFBTSxDQUFDO1lBQ04sS0FBSyxFQUFFO2dCQUNOLFNBQVMsRUFBRSxLQUFLLEdBQUcsVUFBVSxHQUFHLFlBQVk7Z0JBQzVDLG1CQUFtQixFQUFFLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDckMsb0JBQW9CLEVBQUUsT0FBTyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUN0QyxzQkFBc0IsRUFBRSxVQUFVLEdBQUcsQ0FBQyxHQUFHLEVBQUU7Z0JBQzNDLHVCQUF1QixFQUFFLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDNUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUztnQkFDbEUsWUFBWSxFQUFFLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNoQztTQUNELENBQUE7SUFDRixDQUFDO0lBRUQsY0FBYyxDQUFDLElBQVM7UUFDdkIsdUNBQXVDO0lBQ3hDLENBQUM7SUFFRCxNQUFNO1FBQ0wsTUFBTSxDQUFDLENBQ04sb0JBQUMsSUFBSSxJQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDNUMsb0JBQUMsSUFBSSxRQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBUSxDQUM1QixDQUNQLENBQUE7SUFDRixDQUFDO0NBRUQ7QUFFRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ2hDLEtBQUssRUFBRTtRQUNOLFdBQVcsRUFBRSxFQUFFO1FBQ2YsWUFBWSxFQUFFLEVBQUU7UUFDaEIsVUFBVSxFQUFFLENBQUM7UUFDYixhQUFhLEVBQUUsQ0FBQztRQUNoQixlQUFlLEVBQUUsUUFBUSxDQUFDLE1BQU07UUFDaEMsTUFBTSxFQUFFLENBQUM7UUFDVCxTQUFTLEVBQUUsQ0FBQztRQUNaLFFBQVEsRUFBRSxDQUFDO0tBQ1g7Q0FDRCxDQUFDLENBQUEifQ==