import { useState } from "react";
import {
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { Company } from "../types/Company";
import { searchCompanies } from "../api/searchCompanies";
import { debounce } from "../lib/debounce";
import ChoosedList from "../components/ChoosedList";
import SearchedList from "../components/SearchedList";

export default function HomeScreen() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [choosedCompanies, setChoosedCompanies] = useState<Company[]>([]);

  const changeHandler = debounce(
    async (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      try {
        if (!e.nativeEvent.text.trim()) return setCompanies([]);

        const response = await searchCompanies<Company[]>(e.nativeEvent.text);
        setCompanies(response.data);
      } catch (err) {
        throw new Error("Api error", { cause: err });
      }
    }, 
    700
  );

  const chooseCompany = (item: Company) => {
    if (
      choosedCompanies.find(
        (choosedCompany) => choosedCompany.domain === item.domain
      )
    )return;

    setChoosedCompanies((prev) => [...prev, item]);
  };

  const deleteCompany = (item: Company) => {
    setChoosedCompanies((prev) =>
      prev.filter((company) => company.domain !== item.domain)
    );
  };

  return (
    <ScrollView style={styles.scroller}>
      <View style={styles.container}>
        <TextInput style={styles.input} onChange={changeHandler}></TextInput>
        {choosedCompanies.length ? (
          <ChoosedList list={choosedCompanies} deleteItem={deleteCompany} />
        ) : ""}

        {companies.length ? (
          <SearchedList list={companies} chooseItem={chooseCompany} />
        ) : ""}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroller:{
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    position: "relative",
    zIndex: 2,

    width: 332,
    backgroundColor: "#fff",
    fontSize: 14,

    paddingTop: 6,
    paddingHorizontal: 14,
    paddingBottom: 11,

    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderStartWidth: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
});
