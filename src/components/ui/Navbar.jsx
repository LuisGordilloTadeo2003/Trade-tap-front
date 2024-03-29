import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

const navigation = [
  { name: 'Solicitudes', path: '/request', current: true },
  { name: 'Propuestas', path: '/proposal', current: true },
  { name: 'Reservas', path: '/reserves', current: true },
  { name: 'Encargos', path: '/commisions', current: true },
  { name: 'Servicios', path: '/services', current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }) {
  let url;
  user.rol == "trabajador" ? url = "worker" : url = "client";

  const { logout } = useAuthContext();

  return (
    <Disclosure as="nav" className="custom-bg-color border-bottom border-color">
      {({ open }) => (<>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 row p-3 custom-bg-color">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {open ? (<XMarkIcon className="block h-6 w-6" aria-hidden="true" />) : (<Bars3Icon className="block h-6 w-6" aria-hidden="true" />)}
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <NavLink to="/">
                  <img className="img-fluid"
                    style={{ maxWidth: '70px', maxHeight: '70px' }}
                    src="/LogoTradeTap.jpg" alt="Your Company" />
                </NavLink>
              </div>
              <div className="hidden sm:ml-6 sm:flex align-items-center">
                <div className="d-flex justify-content-start align-items-center">
                  {navigation.map((item) => (
                    <Link key={item.name} to={item.path} className="btn mx-3 color-button-general">
                      <strong>{item.name}</strong>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <NavLink to={"/registerWorker"} className="btn mx-3 color-button-general">
                <strong>Únete a nosotros</strong>
              </NavLink>

              <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </Menu.Button>
                </div>
                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <>
                          <Link to={`/profile/${url}/${user.userable_id}`} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                            Mi Perfil
                          </Link>
                          <Link onClick={logout} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                            Cerrar Sesión
                          </Link>
                        </>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (<NavLink key={item.name} to={item.path} className={({ isActive }) => classNames(isActive
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}>
              {item.name}
            </NavLink>))}
          </div>
        </Disclosure.Panel>
      </>)}
    </Disclosure>);
}
