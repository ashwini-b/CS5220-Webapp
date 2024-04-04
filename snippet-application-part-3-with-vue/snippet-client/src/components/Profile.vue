<template>
    <div class="wrapper">
        <div class="profile">
            <!--  profile pic  -->
            <div class="left-column">
                <img v-bind:src="pic" class="profile-pic" alt="profile pic" />
            </div>

            <!--  profile details  -->
            <div class="right-column">
                <p>
                    <i class="far fa-user"></i>
                    {{ user.username }}
                </p>
                <p>
                    <i class='fa fa-briefcase'></i>
                    {{ user.years_experience }}
                </p>
            </div>
        </div>
        <!--  languages -->
        <div class="loop languages">
            <h3>Programming Languages</h3>
            <ul>
                <li v-for="lang in user.programming_languages">
                    {{ lang }}
                </li>
            </ul>
        </div>

        <div class="loop snippets">
            <h3>Snippets</h3>
            <ul v-for="snip in user.snippets">
                    <li> <q><b>{{ snip.title }}</b></q> &nbsp;
                        ({{ snip.programming_language }})
                    </li>
            </ul>
            <div class="right-column-corner">
            <p>
            <button @click="addSnippet">+ Add Snippet</button>
            </p>
            </div>
        </div>
        <div class="loop bookmark">
            <h3>Bookmark IDs</h3>
            <ul>
                <li v-for="bMark in user.bookmarks">
                     {{ bMark._id }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {},
            pic: ''
        };
    },
    async created() {
        const { id } = this.$route.params;

        try {
            const response = await axios.get(
                `http://localhost:8080/users/${id}?snippets=true&bookmarks=true`
            );
            this.user = response.data;
            this.pic = `https://api.dicebear.com/7.x/personas/svg?seed=${this.user.username}&alt="avatar"&backgroundColor=27b8c7`;
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async addSnippet() {
            const token = localStorage.getItem('authToken');
            console.log(token);
        }
    }
};
</script>

<style scoped>
.profile {
    display: flex;
    margin: 0 auto;
    padding: 20px;
}

.profile p {
    color: #f8f8ff;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.profile i {
    color: #27b8c7;
    margin-right: 10px;
}

.profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
}

.left-column {
    flex: 1;
    display: flex;
    justify-content: center;
}

.right-column {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: x-large;
}
.right-column-corner {
    flex: 1;
    display: flex;
    justify-content: right;
}
.languages {
    color: #f8f8ff;
    background-color: #565263;
    text-align: left;
    padding: 15px;
    width: 100%;
}

.loop ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.loop ul li {
    color: #f8f8ff;
    border: 1px solid #d7a8c3;
    border-radius: 2px;
    display: inline-block;
    font-size: 12px;
    margin: 0 7px 7px 0;
    padding: 7px;
    text-transform: uppercase;
}

.snippets {
    color: #f8f8ff;
    background-color: #73677c;
    text-align: left;
    padding: 15px;
    width: 100%;
}

.bookmark {
    color: #f8f8ff;
    background-color: #73677c62;
    text-align: left;
    padding: 15px;
    width: 100%;
}
</style>
