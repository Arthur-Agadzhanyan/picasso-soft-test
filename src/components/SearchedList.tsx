import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Company } from '../types/Company'

interface Props {
    chooseItem: (item:Company)=>void,
    list: Company[]
}

function SearchedList(props: Props) {
    const {chooseItem,list} = props

    return (
        <View style={styles.companies}>
          {list.map((item) => (
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => chooseItem(item)}
              key={item.domain}
            >
              <View style={styles.companyItem}>
                <Image
                  source={{ uri: item.logo }}
                  style={styles.companyItemImage}
                />

                <View style={styles.companyItemInfo}>
                  <Text style={styles.companyItemInfoName}>{item.name}</Text>
                  <Text style={styles.companyItemInfoDomain}>
                    {item.domain}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </View>
    )
}

const styles = StyleSheet.create({
    companies: {
        width: 332,
        paddingVertical: 10,
        textAlign: "left",
    
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderTopWidth: 0,
      },
      companyItem: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 8,
        paddingHorizontal: 14,
      },
      companyItemImage: {
        width: 54,
        minHeight: 54,
        marginRight: 16,
      },
      companyItemInfo: {
        flex: 1,
      },
      companyItemInfoName: {
        fontSize: 14,
        marginBottom: 2,
      },
      companyItemInfoDomain: {
        color: "#9F9F9F",
        fontSize: 12,
      },
})

export default SearchedList

