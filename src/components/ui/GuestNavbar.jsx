import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuthContext from '../../hooks/useAuthContext'

const navigation = [

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function GuestNavbar() {
  const { login, register } = useAuthContext()

  return (
    <Disclosure as="nav" className="custom-bg-color border-bottom border-color">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 row p-3 custom-bg-color">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink to="/">
                    <img
                      className="img-fluid"
                      style={{ maxWidth: '70px', maxHeight: '70px' }}
                      src="/LogoTradeTap.jpg"
                      alt="Your Company"
                    />
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:flex align-items-center h3 pl-5">
                  TradeTap
                </div>
              </div>
              <div className=" hidden inset-y-0 right-0 flex sm:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NavLink to={"/login"} className="btn mx-3 color-button-general">
                  <strong>Iniciar Sesion</strong>
                </NavLink>
                <NavLink to={"/register"} className="btn mx-3 color-button-general">
                  <strong>Registrarse</strong>
                </NavLink>
                <NavLink to={"/registerWorker"} className="btn mx-3 color-button-general">
                  <strong>Trabaja con nosotros</strong>
                </NavLink>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a href='/login' className="text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium"><strong>Iniciar sesion</strong></a>
              <a href='/register' className="text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium"><strong>Registrarse</strong></a>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}