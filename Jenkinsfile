node {
   def commit_id
   stage('Preparation') {
     checkout scm
     sh "git rev-parse --short HEAD > .git/commit-id"                        
     commit_id = readFile('.git/commit-id').trim()
   }
   stage('docker build/push') {
     docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-login') {
       def app = docker.build("danidlx/ejs-challenge-image:${commit_id}", '.').push()
     }
   }
   stage('docker run'){
      //docker.image('danidlx/ejs-challenge-i').withRun('-e "MYSQL_ROOT_PASSWORD=my-secret-pw" -p 3306:3306')          
      println(app);    
   }
}
