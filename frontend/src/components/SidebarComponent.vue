<script>
export default {
  name: "SidebarComponent",
  props: {
    userName: String,
    id: String,
  },
  methods: {
    navigateToDashboard() {
      this.$router.push({
        path: "/dashboard",
        query: { user: this.userName },
      });
    },
    navigateToGoals() {
      this.$router.push({
        path: "/goals",
        query: { id: this.id, name: this.userName },
      });
    },
    mounted() {
      // console.log("initials ", this.user);
    },
  },
};
</script>

<template>
  <main>
    <div class="container">
      <div class="element1">
        <div class="inner-container">
          <span class="circle" @click="navigateToDashboard">{{
            userName && userName.charAt(0)
          }}</span>
        </div>

        <div class="border-top">
          <div class="inner-content">
            <a href="#" class="button-group" @click="navigateToGoals">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="tooltip">Goals</span>
            </a>
            <a href="#" class="button-group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="tooltip">General</span>
            </a>
          </div>
        </div>
      </div>

      <div class="bottom-bar">
        <form action="#">
          <!-- <button type="submit" class="logout-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span class="tooltip">Logout</span>
          </button> -->
        </form>
      </div>
    </div>
  </main>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 4rem;
  border-right: 1px solid #e2e8f0;
  background-color: #fff;
}

.element1 {
  display: flex;
  flex-direction: column;
}

.inner-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.circle {
  width: 2rem;
  height: 2rem;
  display: grid;
  place-content: center;
  border-radius: 0.5rem;
  background-color: #f7fafc;
  color: hsl(216, 14%, 35%);
}

.circle:hover {
  cursor: pointer;
}

.border-top {
  border-top: 1px solid #cbd5e0;
}

.inner-content {
  padding: 0.5rem;
}

.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  background-color: #ebf8ff;
  padding: 0.375rem 0.75rem;
  color: #4a5568;
  margin-top: 10px;
}

.tooltip {
  visibility: hidden;
  position: absolute;
  left: 100%;
  top: 50%;
  margin-left: 0.5rem;
  transform: translateY(-50%);
  border-radius: 0.375rem;
  background-color: #000;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #fff;
}

.button-group:hover .tooltip {
  visibility: visible;
}

.list-items {
  margin-top: 0.25rem;
}

.list-items > li + li {
  margin-top: 0.25rem;
}

.logout-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  background-color: #ebf8ff;
  padding: 0.375rem 0.75rem;
  color: #4a5568;
}

.logout-button:hover .tooltip {
  visibility: visible;
}

.bottom-bar {
  position: sticky;
  bottom: 0;
  border-top: 1px solid #cbd5e0;
  padding: 0.5rem;
}
</style>
