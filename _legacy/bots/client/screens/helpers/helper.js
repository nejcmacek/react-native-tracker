import { NavigationActions } from "react-navigation";
export function resetNavigation(navigation, componentName, params) {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: componentName })
        ],
    });
    navigation.dispatch(resetAction);
    if (params)
        navigation.setParams(params);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR3JELE1BQU0sMEJBQTBCLFVBQWUsRUFBRSxhQUFxQixFQUFFLE1BQWU7SUFDdEYsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1FBQzNDLEtBQUssRUFBRSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1IsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxDQUFDO1NBQ3hEO0tBQ0QsQ0FBQyxDQUFBO0lBQ0YsVUFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDVixVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzlCLENBQUMifQ==