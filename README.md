# Customizable personal website. 

Visualization of Work Experience, About and Contact Page with admin portal and database to enable real time updates.

## Live Websites Using *visiual-portfolio*
[sarahepperle.com](https://sarahepperle.com/)

## Getting Started
To run the devlopment Server

```bash
docker compose --profile dev up -d --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will need to have a *.ENV* file here is an (highly insecure) with the following constants,

```bash
# .env file
# FOR MONGO SERVICE (DEVELOPMENT)
MONGO_INITDB_DATABASE=appdb
MONGO_DB=myapp

MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=password

MONGO_APP_R_USER=user_read
MONGO_APP_R_PASS=pass

# FOR NEXT SERVICE (DEVELOPMENT)
MONGO_URI=mongodb://user_read:pass@mongo:27017/myapp?authSource=myapp
JWT_SECRET=supersecret
# hashed password for admin user (test1234)
USER_PASS='$2b$12$XW0S3PzRoJ1SAJHeMNzHmuU5gloso4O9Cq7i9wuhs1MaMo3dZ17Om'
```


## Stopping Application

To stop the applicaiton
```bash
docker compose --profile dev down
# To close and Delete volumes
docker compose --profile dev down -v
```



## Expected Results
![Homepage of Visual Portfolio](./assets/demo-homepage.png)
Expected Results of Homepage.
***

![About of Visual Portfolio](./assets/demo-contact.png)
Expected Results of About Tab.
***

![Work of Visual Portfolio](./assets/demo-work.png)
Expected Results of Work Tab.
***

![Settings of Visual Portfolio](./assets/demo-settings.png)
Expected Results of Settings Tab.



## TODO
-   [ ] Add dropdown under work experience
-   [ ] Host Resume and Profile Photo in External Storage (S3)
-   [ ] Write Blog Post/ on lesson learned from this project


__Built by Evan St Pierre.__
