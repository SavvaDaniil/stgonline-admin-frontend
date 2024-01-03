import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProfileDTO } from 'src/app/dto/admin/AdminProfileDTO';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { constant } from 'src/app/util/GlobalVariables';

@Injectable({
  providedIn: 'root'
})
export class AdminService 
{
  constructor() { }

  public async profileUpdate(
    jwt: string, 
    username: string,

    ...

    setIsLoading: (value: boolean) => void,
    setWarning: (value: string) => void,
    setSuccess: (value: string) => void,
    adminMiddleware: AdminMiddlewareService,
  ): Promise<void>
  {
    setIsLoading(true);
    setWarning("");
    setSuccess("");
    try
    {
      await fetch(constant.baseDomain + "/api/admin/profile", 
          {
              method : "PUT",
              headers: {
                'Authorization': 'Bearer '+ jwt, 
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  "username" : username,
                  "firstname" : firstname,
                  ...
              })
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          if(...)
          {
            if(jsonAnswerStatus.access_token !== null && typeof(jsonAnswerStatus.access_token) !== "undefined")
            {
              adminMiddleware.setJWTToCookie(jsonAnswerStatus.access_token);
            }
            setSuccess("Успешно сохранено");
          } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "wrong")
          {
            setWarning("Текущий пароль введен неверно");
          } else 
          {
            setWarning("Неизвестная ошибка на сервере");
          }
        },
        (error) => {
            console.log(error);
            setWarning("Ошибка на стороне сервера");
        }
      )

    } catch(error)
    {
      console.log(error);
      setWarning("Неизвестная ошибка на сервере");
    } finally
    {
      setIsLoading(false);
    }
  }

  public async profileGet(
    jwt: string, 
    setProfileForm: (adminProfileDTO: AdminProfileDTO) => void,
    setIsLoading: (value: boolean) => void,
    //warningCallback: (value: string) => void
    setIsError: (value: boolean) => void,
  ): Promise<void>
  {
    setIsLoading(true);
    setIsError(false);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/profile", 
          {
              method : "GET",
              headers: {
                'Authorization': 'Bearer '+ jwt, 
                'Content-Type': 'application/json'
              }
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          //console.log(jsonAnswerStatus);
          if(jsonAnswerStatus.status === "success" && ...)
          {
            setProfileForm(jsonAnswerStatus.adminProfileViewModel);
          } else 
          {
            setIsError(true);
          }
        },
        (error) => {
            console.log(error);
            setIsError(true);
        }
      )

    } catch(error)
    {
      console.log(error);
      setIsError(true);
    } finally
    {
      setIsLoading(false);
    }
  }

  public async login(
    username: string, 
    password: string, 
    setIsLoading: (value: boolean) => void,
    warningCallback: CallableFunction, 
    adminMiddleware: AdminMiddlewareService,
    router: Router
    //loginCallback: CallableFunction,
    //navigateCallback: CallableFunction
  ): Promise<void>
  {
    setIsLoading(true);
    warningCallback("");
    try
    {
      if(username === "" || typeof(username) === "undefined" || password === "" || typeof(password) === "undefined")
      {
          warningCallback("Все поля обязательны для заполнения");
          return;
      }
      const data = {
          username: username,
          password : password
      }
      await fetch(constant.baseDomain + "/api/admin/login", 
          {
              method : "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          console.log(jsonAnswerStatus);
          if(jsonAnswerStatus.status === "success" && ...)
          {
              adminMiddleware.setJWTToCookie(jsonAnswerStatus.access_token);
              router.navigateByUrl("/");
          } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "wrong")
          {
              warningCallback("Неверный логин или пароль");
          } else {
              warningCallback("Неизвестная ошибка на сервере");
          }
          },
        (error) => {
            warningCallback("Ошибка на стороне сервера");
        }
      )

    } catch(error)
    {
      console.log(error);
    } finally
    {
      setIsLoading(false);
    }
  }
}
