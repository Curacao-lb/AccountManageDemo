import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  SectionList,
  Alert,
  Switch
} from 'react-native'

import icon_add from '../assets/icon_add.png';
import icon_game from '../assets/icon_game.png';
import icon_platform from '../assets/icon_platform.png';
import icon_bank from '../assets/icon_bank.png';
import icon_other from '../assets/icon_other.png';
import icon_arrow from '../assets/icon_arrow.png';
import Account from './account'
import { useEffect, useRef, useState } from 'react'
import { load, save } from '../utils/storage'

const iconMap: any = {
  Game: icon_game,
  Platform: icon_platform,
  Bank: icon_bank,
  Others: icon_other,
};


export default () => {
  const addAccountRef = useRef<any>(null);

  const [sectionData, setSectionData] = useState([]);

  const [sectionState, setSectionState] = useState<any>({
    Game: true,
    Platform: true,
    Bank: true,
    Others: true,
  });

  const [passwordOpen, setPasswordOpen] = useState(true);


  useEffect(() => {
    loadData();
  }, []);

  const title = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>Account Management</Text>
        <Switch
          style={styles.switch}
          value={passwordOpen}
          onValueChange={value => {
            setPasswordOpen(value);
          }}
        />
      </View>
    )
  }

  const loadData = () => {
    load('accountList').then((data: any) => {
      const accountList = JSON.parse(data);

      const gameList = accountList.filter((item: any) => item.type === 'Game') || [];
      const platformList = accountList.filter((item: any) => item.type === 'Platform') || [];
      const bankList = accountList.filter((item: any) => item.type === 'Bank') || [];
      const otherList = accountList.filter((item: any) => item.type === 'Others') || [];

      const sectionData1: any = [
        { type: 'Game', data: gameList },
        { type: 'Platform', data: platformList },
        { type: 'Bank', data: bankList },
        { type: 'Others', data: otherList }
      ];

      LayoutAnimation.easeInEaseOut();
      setSectionData(sectionData1);
    });
  }

  const deleteAccount = (account: any) => {
    load('accountList').then((data: any) => {
      let accountList = JSON.parse(data);
      accountList = accountList.filter((item: any) => item.id !== account.id);
      save('accountList', JSON.stringify(accountList)).then(() => {
        loadData();
      });
    })
  }

  const renderItem = ({ item, index, section }: any) => {
    console.log('ectionState[section.type]', sectionState[section.type]);
    console.log('item', item);


    if (!sectionState[section.type]) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.itemLayout}
        onPress={() => {
          addAccountRef.current.show(item);
        }}
        onLongPress={() => {
          const buttons = [
            { text: '取消', onPress: () => { } },
            { text: '确定', onPress: () => deleteAccount(item) }
          ];
          Alert.alert('提示', `确定删除「${item.name}」账号吗？`, buttons);
        }}
      >
        <Text style={styles.nameTxt}>{item.name}</Text>
        <View style={styles.accpwdLayout}>
          <Text style={styles.accpwdTxt}>{`账号：${item.account}`}</Text>
          <Text style={styles.accpwdTxt}>{`密码：${passwordOpen ? item.password : '********'}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const renderSectionHeader = ({ section }: any) => {
    return (
      <View style={[
        styles.groupHeader,
        {
          borderBottomLeftRadius: (!section.data.length || !sectionState[section.type]) ? 12 : 0,
          borderBottomRightRadius: (!section.data.length || !sectionState[section.type]) ? 12 : 0
        }
      ]}>
        <Image style={styles.typeImg} source={iconMap[section.type]} />
        <Text style={styles.typeTxt}>{section.type}</Text>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => {
            const copy = { ...sectionState };
            copy[section.type] = !copy[section.type];
            LayoutAnimation.easeInEaseOut();
            setSectionState(copy);
          }}
        >
          <Image
            style={[
              styles.arrowImg,
              { transform: [{ rotate: sectionState[section.type] ? '0deg' : '-90deg' }] }
            ]}
            source={icon_arrow}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {title()}

      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => {
        addAccountRef.current.show()
      }}>
        <Image style={styles.addButton} source={icon_add} />
      </TouchableOpacity>

      <Account ref={addAccountRef} onSave={loadData} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F0'
  },
  titleLayout: {
    width: '100%',
    height: 46,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleTxt: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 64,
    right: 28,
  },
  addImg: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  groupHeader: {
    width: '100%',
    height: 46,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  typeImg: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  listContainer: {
    paddingHorizontal: 12,
  },
  typeTxt: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  arrowButton: {
    position: 'absolute',
    right: 0,
    padding: 16,
  },
  arrowImg: {
    width: 20,
    height: 20,
  },
  itemLayout: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  nameTxt: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  accpwdLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accpwdTxt: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    marginTop: 12,
    marginBottom: 6,
  },
  switch: {
    position: 'absolute',
    right: 12,
  },
})