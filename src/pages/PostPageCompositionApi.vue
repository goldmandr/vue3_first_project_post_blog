<template>
    <div>

        <h1>Страница с постами</h1>


        <MyInput    
            v-model="searchQuery"
            placeholder="Поиск..."
            v-focus
        />
            
        

        <div class="app__btns">
            <MyButton 
            >
            Создать пост
            </MyButton>

            <MySelect
                v-model="selectedSort"
                :options="sortOptions"
            
            >
                
            </MySelect>
        
        </div>

        <MyDialog v-model:show="dialogVisible">
             <PostForm></PostForm>
        </MyDialog>
       
        <PostList 
            :posts="searchedPosts"
            v-if="!isPostsLoading"
        />

        <div v-else>Идет загрузка...</div>
            
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MyButton from '@/components/UI/MyButton.vue';
import axios from 'axios';
import MySelect from '@/components/UI/MySelect.vue';
import { ref } from 'vue';
import {usePosts} from '@/hooks/usePosts'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSearchedPosts from '@/hooks/useSearchedPosts'


export default {
    components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
    MySelect,
},

    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'By title'},
                {value: 'body', name: 'By body'}
            ]
        }
    },
    setup(props) {
        const {posts, totalPages, isPostLoading} = usePosts(10)
        const {selectedSort, sortedPosts} = useSortedPosts(posts);
        const {searchQuery, searchedPosts} = useSearchedPosts(sortedPosts)

        return{
            posts,
            totalPages,
            isPostLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            searchedPosts
        }
    }
}
</script>

<style>

.app__btns{
    margin:15px 0px;
    display: flex;
    justify-content: space-between;

}

</style>