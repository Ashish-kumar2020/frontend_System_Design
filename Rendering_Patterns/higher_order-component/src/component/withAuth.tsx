import type { ComponentType } from "react";

export const withAuth = (WrappedComponent: ComponentType) => {
  const isAuthenticated = false;
  return function EnhancedComponent (){
    if(!isAuthenticated){
      return <h3>Please Login first</h3>
    }
    return <WrappedComponent/>
  }
};
