// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  build: {
    minify: false
  },
  server: {
    open: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qXG4gKiBAQXV0aG9yOiB4aWFvaHVcbiAqIEBEYXRlOiAyMDIyLTEyLTA3IDE1OjM0OjEwXG4gKiBATGFzdEVkaXRvcnM6IGx6eS1KZXJyeVxuICogQExhc3RFZGl0VGltZTogMjAyMy0wOC0zMCAyMDo1MToxNlxuICogQEZpbGVQYXRoOiBcXHJlYWN0LWRlbW8tdHNcXHZpdGUuY29uZmlnLnRzXG4gKiBARGVzY3JpcHRpb246IFxuICovXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgIFwiQFwiOiBcIi9zcmNcIlxuICAgIH1cbiAgICAvLyBleHRlbnNpb25zOiBbXCJ0c3hcIiwgXCJqc3hcIiwgXCJ0c1wiLCBcImpzXCJdXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgbWluaWZ5OiBmYWxzZVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBvcGVuOiBmYWxzZSAvLyBcdTY2MkZcdTU0MjZcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTZENEZcdTg5QzhcdTU2NjhcbiAgfVxuICAvLyBzZXJ2ZXI6IHtcbiAgLy8gICBwb3J0OiA4MCxcbiAgLy8gICBob3N0OiBcIjE5Mi4xNjguMTkuMjhcIiwgLy8gXHU5MTREXHU3RjZFXHU1QzQwXHU1N0RGXHU3RjUxXHU4QkJGXHU5NUVFXG4gIC8vICAgcHJveHk6IHtcbiAgLy8gICAgIC8vIFwiL2FwaVwiOiB7XG4gIC8vICAgICAvLyAgIHRhcmdldDogXCJodHRwOi8vZXhhbXZpZGVvLjUxYm0ubmV0LmNuXCIsXG4gIC8vICAgICAvLyAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgLy8gICAgIC8vIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSxcbiAgLy8gICAgIC8vIH0sXG4gIC8vICAgfSxcbiAgLy8gfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBUUE7QUFDQTtBQUlBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQztBQUFBLEVBQ1YsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0osS0FBSztBQUFBO0FBQUE7QUFBQSxFQUlWLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQTtBQUFBLEVBRVYsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==