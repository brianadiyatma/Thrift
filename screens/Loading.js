import React from "react";
import { View, Text } from "react-native";
import { DotIndicator } from "react-native-indicators";

const Loading = () => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DotIndicator color="#FF8D44" />
      </View>
    </ScrollView>
  );
};

export default Loading;
