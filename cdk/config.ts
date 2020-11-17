export const config = {
    github: {
      owner: 'jkinos',
      repository: 'warehouse-app-frontend',
    },
    env: { 
        account: process.env.CDK_DEFAULT_ACCOUNT, 
        region: process.env.CDK_DEFAULT_REGION 
    }
  }