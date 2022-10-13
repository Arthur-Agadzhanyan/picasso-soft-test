import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Company } from '../types/Company'

interface Props {
    deleteItem: (item:Company)=>void,
    list: Company[]
}

function ChoosedList(props: Props) {
    const {deleteItem,list} = props

    return (
        <View style={styles.choosedCompanies}>
          
          {list.map((item) => (
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => deleteItem(item)}
              key={item.domain}
            >
              <View style={styles.companyItem}>
                  <Text style={styles.companyItemName}>{item.name}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
    )
}

const styles = StyleSheet.create({
    choosedCompanies: {
        width: 332,
    
        paddingVertical: 10,
    
        textAlign: "left",
    
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderTopWidth: 0,
        flex: 1,
        display: 'flex',
        alignItems:"center",
        flexDirection: "row",
        flexWrap: "wrap"
      },
      companyItem: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 8,
        paddingHorizontal: 14,
      },
      companyItemName:{

      }
})

export default ChoosedList

