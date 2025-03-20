
import React, { useState } from 'react';
import { View, Text ,FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Layout from '../../components/Layout';
import InputCM from '../../components/common/InputCM';
import ButtonCM from '../../components/common/ButtonCM';
import CircularProgressIndicator from '../../components/common/CircularProcess';
import TaskDetailsScreen from './TaskDetails';
import Profile from '../../components/Profile'

type Task = {
  id: string;
  title: string;
  members: string[];
};

type Projects = {
  id: string;
  title: string;
  members: string[];
  time: string;
};
const Home: React.FC = () => {
    const navigation = useNavigation();
    const [textSearch, setTextSearch] = useState<string>('');
    const list_completed_task: Task[] = [
      {
        id: '1',
        title: 'Real Estate Website Design1',
        members:  ['#ffac33','#beff33','#19ffe3','#192eff','#ff19ff']
      },
      {
        id: '2',
        title: 'Real Estate Website Design2',
        members:  ['#ffac33','#beff33','#19ffe3','#192eff','#ff19ff']
      },
      {
        id: '3',
        title: 'Real Estate Website Design3',
        members:  ['#ffac33','#beff33','#19ffe3','#192eff','#ff19ff']
      },
      {
        id: '4',
        title: 'Real Estate Website Design4',
        members:  ['#ffac33','#beff33','#19ffe3','#192eff','#ff19ff']
      },
      {
        id: '5',
        title: 'Real Estate Website Design5',
        members:  ['#ffac33','#beff33','#19ffe3','#192eff','#ff19ff']
      },
    ];

    const list_Projects: Projects[] = [
      {
        id: '11',
        title: 'Mobile App Wireframe',
        members:  ['#ffac33','#beff33','#19ffe3'],
        time: '21 March'
      },
      {
        id: '22',
        title: 'Real Estate App Design',
        members:  ['#ffac33','#beff33','#ff19ff'],
        time: '21 March'
      },
      {
        id: '33',
        title: 'Real Estate Website ',
        members:  ['#192eff', '#ffac33','#ff19ff'],
        time: '21 March'
      },
      {
        id: '44',
        title: 'Real Estate Website ',
        members:  ['#19ffe3','#192eff','#ff19ff'],
        time: '21 March'
      },
      {
        id: '55',
        title: 'Real Estate Website ',
        members:  ['#beff33','#19ffe3','#192eff'],
        time: '21 March'
      },
    ];
    const goToProfile = () => {
      navigation.navigate('Profile' as never)
    }
    const handleSearch = () => {}

    const renderTasksItem = ({item}: {item: Task }) => (
      <View style={styles.completedTasksSlideItems}>
        <Text style={styles.completedTasksSlideItemsTitle}>{item.title}</Text>
        <View style={styles.completedTasksSlideItemsMembers}>
          <Text style={styles.completedTasksSlideItemsMembersText}>Team members</Text>
          <View style={styles.completedTasksSlideItemsMembersList}>
            {
              item.members.map((color: string, index: number) => (
                <Icon style={[
                  styles.completedTasksSlideItemsMembersListAvatar,
                  {right: index ? index*15 : 0, zIndex: -index + 6}
                ]} name="reddit" size={20} color={color} key={index}/>
              ))
            }
          </View>
        </View>
        <View style={styles.completedTasksSlideItemsResult}>
          <Text style={styles.completedTasksSlideItemsResultStatus}>Completed</Text>
          <Text style={styles.completedTasksSlideItemsResultPercent}>100%</Text>
        </View>
        <View style={styles.completedTasksSlideItemsResultProcess}/>
      </View>
    )

    const renderProjectsItem = ({ item }: {item: Projects }) => (
      <View style={styles.projectsListItems}>
        <Text style={styles.projectsListItemsTitle}>{item.title}</Text>
        <View style={styles.projectsListItemsContent}>
          <View style={styles.projectsListItemsContentInfo}>
            <Text style={styles.projectsListItemsContentInfoTextMembers}>Team members</Text>
            <View style={styles.projectsListItemsContentInfoList}>
              {
                item.members.map((color: string, index: number) => (
                  <Icon style={[
                    styles.projectsListItemsContentInfoListAvatar,
                    {left: index ? index*15 : 0, zIndex: index + 1}
                  ]} name="reddit" size={20} color={color} key={index}/>
                ))
              }
            </View>
            <Text style={styles.projectsListItemsContentInfoDueOn}>Due on: {item.time}</Text>
          </View>
          <CircularProgressIndicator 
            progress={75} 
            size={60}
            strokeWidth={2}
            progressColor="#F9D56E"
            backgroundColor="#2A3942"
          />
        </View>
      </View>
    )
    return (
      <Layout>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTextWecome}>Welcome Back!</Text>
              <Text style={styles.headerTextUser}>Fazil Laghari</Text>
            </View>
            <Icon name="reddit" size={48} color="#FFD700" onPress={goToProfile}/>
          </View>

          <View style={styles.search}>
            <InputCM
                style={styles.searchInput}
                placeholder="Search tasks"
                value={textSearch}
                iconName='search'
                onChangeText={setTextSearch}
            />
            <ButtonCM style={styles.searchBtn} iconName="refresh" onPress={handleSearch} />
          </View>

          <View style={styles.completedTasks}>
            <View style={styles.completedTasksHeader}>
              <Text style={styles.completedTasksHeaderTitle}>Completed Tasks</Text>
              <Text style={styles.completedTasksHeaderSeeAll}>See all</Text>
            </View>
            <FlatList
                style={styles.completedTasksSlide}
                data={list_completed_task}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{width: 10}} />}
                renderItem={renderTasksItem}
                showsVerticalScrollIndicator={false}
              />
          </View>


          <View style={styles.projects}>
            <View style={styles.projectsHeader}>
              <Text style={styles.projectsHeaderTitle}>Ongoing Projects</Text>
              <Text style={styles.projectsHeaderSeeAll}>See all</Text>
            </View>
            <FlatList
                data={list_Projects}
                renderItem={renderProjectsItem}
                keyExtractor={item => item.id}
                style={styles.projectsList}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                showsVerticalScrollIndicator={false}
              />
          </View>
      </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTextWecome: {
    color: '#FED36A',
    fontSize: 12,
  },
  headerTextUser: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold'
  },
  search: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
    gap: 16
  },
  searchInput: {
    flex: 1
  },
  searchBtn: {
    width: 58,
    height: 58
  },
  completedTasks: {
    marginTop: 34,
  },
  completedTasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  completedTasksHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  completedTasksHeaderSeeAll: {
    color: '#FED36A',
    fontSize: 16,
  },
  completedTasksSlide: {
    marginTop: 13
  },
  completedTasksSlideItems: {
    width: 183,
    height: 175,
    backgroundColor: '#FED36A',
    padding: 10,
  },
  completedTasksSlideItemsTitle: {
    fontSize: 30,
    lineHeight: 25,
    fontWeight: '500',
    color: '#000000',
    height: 80,
  },
  completedTasksSlideItemsMembers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 15
  },
  completedTasksSlideItemsMembersText: {
    fontSize: 11,
  },
  completedTasksSlideItemsMembersList: {
    position: 'relative',
  },
  completedTasksSlideItemsMembersListAvatar: {
    position: 'absolute'
  },
  completedTasksSlideItemsResult: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  completedTasksSlideItemsResultStatus: {
    fontSize: 11
  },
  completedTasksSlideItemsResultPercent: {
    fontSize: 9,
    fontWeight: 600
  },
  completedTasksSlideItemsResultProcess: {
    marginTop: 3,
    height: 6,
    width: '100%',
    backgroundColor: '#212832',
    borderRadius: 8
  },
  projects: {
    marginTop: 34,
    flex: 1

  },
  projectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
    projectsHeaderTitle: {
      color: '#FFFFFF',
      fontSize: 20,
  },
  projectsHeaderSeeAll: {
    color: '#FED36A',
    fontSize: 16,
  },
  projectsList: {
    marginTop: 16,
  },
  projectsListItems: {
    width: '100%',
    height: 125,
    padding: 10,
    backgroundColor: '#455A64',
  },
  projectsListItemsTitle: {
    fontSize: 30,
    lineHeight: 25,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  projectsListItemsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  projectsListItemsContentInfo: {
    flex: 1,
  },
  projectsListItemsContentInfoTextMembers: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  projectsListItemsContentInfoList: {
    position: 'relative',
    height: 20,
    marginTop: 5,
  },
  projectsListItemsContentInfoListAvatar: {
    position: 'absolute'
  },
  projectsListItemsContentInfoDueOn: {
    marginTop: 10,
    color: '#FFFFFF',
  }
});

export default Home;